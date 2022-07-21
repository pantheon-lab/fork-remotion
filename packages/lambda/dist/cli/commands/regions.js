"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regionsCommand = exports.REGIONS_COMMAND = void 0;
const log_1 = require("@remotion/cli/dist/log");
const get_regions_1 = require("../../api/get-regions");
exports.REGIONS_COMMAND = 'regions';
const regionsCommand = () => {
    log_1.Log.info((0, get_regions_1.getRegions)().join(' '));
};
exports.regionsCommand = regionsCommand;
