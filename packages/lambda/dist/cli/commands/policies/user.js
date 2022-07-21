"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSubcommand = exports.USER_SUBCOMMAND = void 0;
const suggested_policy_1 = require("../../../api/iam-validation/suggested-policy");
const log_1 = require("../../log");
exports.USER_SUBCOMMAND = 'user';
const userSubcommand = () => {
    log_1.Log.info((0, suggested_policy_1.getUserPolicy)());
};
exports.userSubcommand = userSubcommand;
