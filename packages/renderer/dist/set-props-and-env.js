"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPropsAndEnv = void 0;
const remotion_1 = require("remotion");
const normalize_serve_url_1 = require("./normalize-serve-url");
const puppeteer_evaluate_1 = require("./puppeteer-evaluate");
const validate_puppeteer_timeout_1 = require("./validate-puppeteer-timeout");
const setPropsAndEnv = async ({ inputProps, envVariables, page, serveUrl, initialFrame, timeoutInMilliseconds, proxyPort, retriesRemaining, }) => {
    (0, validate_puppeteer_timeout_1.validatePuppeteerTimeout)(timeoutInMilliseconds);
    const actualTimeout = timeoutInMilliseconds !== null && timeoutInMilliseconds !== void 0 ? timeoutInMilliseconds : remotion_1.Internals.DEFAULT_PUPPETEER_TIMEOUT;
    page.setDefaultTimeout(actualTimeout);
    page.setDefaultNavigationTimeout(actualTimeout);
    const urlToVisit = (0, normalize_serve_url_1.normalizeServeUrl)(serveUrl);
    await page.evaluateOnNewDocument((timeout) => {
        window.remotion_puppeteerTimeout = timeout;
    }, [actualTimeout]);
    if (inputProps) {
        await page.evaluateOnNewDocument((input) => {
            window.remotion_inputProps = input;
        }, [JSON.stringify(inputProps)]);
    }
    if (envVariables) {
        await page.evaluateOnNewDocument((input) => {
            window.remotion_envVariables = input;
        }, [JSON.stringify(envVariables)]);
    }
    await page.evaluateOnNewDocument((key) => {
        window.remotion_initialFrame = key;
    }, [initialFrame]);
    await page.evaluateOnNewDocument((port) => {
        window.remotion_proxyPort = port;
    }, [proxyPort]);
    const pageRes = await page.goto(urlToVisit);
    if (pageRes === null) {
        throw new Error(`Visited "${urlToVisit}" but got no response.`);
    }
    const status = pageRes.status();
    // S3 in rare occasions returns a 500 or 503 error code for GET operations.
    // Usually it is fixed by retrying.
    if (status >= 500 && status <= 504 && retriesRemaining > 0) {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
        return (0, exports.setPropsAndEnv)({
            envVariables,
            initialFrame,
            inputProps,
            page,
            proxyPort,
            retriesRemaining: retriesRemaining - 1,
            serveUrl,
            timeoutInMilliseconds,
        });
    }
    if (status !== 200 &&
        status !== 301 &&
        status !== 302 &&
        status !== 303 &&
        status !== 304 &&
        status !== 307 &&
        status !== 308) {
        throw new Error(`Error while getting compositions: Tried to go to ${urlToVisit} but the status code was ${status} instead of 200. Does the site you specified exist?`);
    }
    const isRemotionFn = await (0, puppeteer_evaluate_1.puppeteerEvaluateWithCatch)({
        pageFunction: () => {
            return window.getStaticCompositions;
        },
        args: [],
        frame: null,
        page,
    });
    if (isRemotionFn === undefined) {
        throw new Error(`Error while getting compositions: Tried to go to ${urlToVisit} and verify that it is a Remotion project by checking if window.getStaticCompositions is defined. However, the function was undefined, which indicates that this is not a valid Remotion project. Please check the URL you passed.`);
    }
    const siteVersion = await (0, puppeteer_evaluate_1.puppeteerEvaluateWithCatch)({
        pageFunction: () => {
            return window.siteVersion;
        },
        args: [],
        frame: null,
        page,
    });
    if (siteVersion !== '3') {
        throw new Error(`Incompatible site: When visiting ${urlToVisit}, a bundle was found, but one that is not compatible with this version of Remotion. The bundle format changed in version 3.0.11. To resolve this error, please bundle and deploy again.`);
    }
};
exports.setPropsAndEnv = setPropsAndEnv;
