"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleSubcommand = exports.ROLE_SUBCOMMAND = void 0;
const suggested_policy_1 = require("../../../api/iam-validation/suggested-policy");
const log_1 = require("../../log");
exports.ROLE_SUBCOMMAND = 'role';
const roleSubcommand = () => {
    log_1.Log.info((0, suggested_policy_1.getRolePolicy)());
};
exports.roleSubcommand = roleSubcommand;
