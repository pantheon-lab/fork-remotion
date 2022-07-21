"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const get_latest_remotion_version_1 = require("../get-latest-remotion-version");
(0, vitest_1.test)('Should be able to get a Remotion version', async () => {
    (0, vitest_1.expect)(await (0, get_latest_remotion_version_1.getLatestRemotionVersion)()).toMatch(/^(([0-9]+)\.([0-9]+)\.([0-9]+))$/);
});
