"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmCli = void 0;
const args_1 = require("../args");
const quit_1 = require("./quit");
const yes_or_no_1 = require("./yes-or-no");
const confirmCli = async ({ delMessage, allowForceFlag, }) => {
    if (allowForceFlag && args_1.forceFlagProvided) {
        return;
    }
    const result = await (0, yes_or_no_1.yesOrNo)({ question: delMessage, defaultValue: true });
    if (result === false) {
        (0, quit_1.quit)(1);
    }
};
exports.confirmCli = confirmCli;
