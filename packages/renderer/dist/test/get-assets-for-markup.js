"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssetsForMarkup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @vitest-environment jsdom
 */
const react_1 = require("@testing-library/react");
const react_2 = __importStar(require("react"));
const test_utils_1 = require("react-dom/test-utils");
const remotion_1 = require("remotion");
// @ts-expect-error
global.IS_REACT_ACT_ENVIRONMENT = true;
let collectAssets = () => [];
const waitForWindowToBeReady = () => {
    return new Promise((resolve) => {
        let interval = null;
        const check = () => {
            if (window.ready) {
                clearInterval(interval);
                resolve();
            }
        };
        interval = setInterval(check, 5);
    });
};
const getAssetsForMarkup = async (Markup, config) => {
    const collectedAssets = [];
    const Wrapped = () => {
        const [assets, setAssets] = (0, react_2.useState)([]);
        const registerAsset = (0, react_2.useCallback)((asset) => {
            setAssets((assts) => {
                return [...assts, asset];
            });
        }, []);
        const unregisterAsset = (0, react_2.useCallback)((id) => {
            setAssets((assts) => {
                return assts.filter((a) => a.id !== id);
            });
        }, []);
        (0, react_2.useLayoutEffect)(() => {
            if (typeof window !== 'undefined') {
                collectAssets = () => {
                    (0, test_utils_1.act)(() => {
                        setAssets([]); // clear assets at next render
                    });
                    return assets;
                };
            }
        }, [assets]);
        remotion_1.Internals.setupPuppeteerTimeout();
        const compositions = (0, react_2.useContext)(remotion_1.Internals.CompositionManager);
        const value = (0, react_2.useMemo)(() => {
            return {
                ...compositions,
                assets,
                registerAsset,
                unregisterAsset,
                compositions: [
                    {
                        ...config,
                        id: 'markup',
                        component: react_2.default.lazy(() => Promise.resolve({
                            default: Markup,
                        })),
                        nonce: 0,
                        defaultProps: undefined,
                        folderName: null,
                        parentFolderName: null,
                    },
                ],
                currentComposition: 'markup',
            };
        }, [assets, compositions, registerAsset, unregisterAsset]);
        return ((0, jsx_runtime_1.jsx)(remotion_1.Internals.CanUseRemotionHooksProvider, { children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.RemotionRoot, { children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.CompositionManager.Provider, { value: value, children: (0, jsx_runtime_1.jsx)(Markup, {}) }) }) }));
    };
    (0, react_1.render)((0, jsx_runtime_1.jsx)(Wrapped, {}));
    for (let currentFrame = 0; currentFrame < config.durationInFrames; currentFrame++) {
        (0, test_utils_1.act)(() => {
            window.remotion_setFrame(currentFrame);
        });
        await waitForWindowToBeReady();
        collectedAssets.push(collectAssets());
    }
    return collectedAssets;
};
exports.getAssetsForMarkup = getAssetsForMarkup;
