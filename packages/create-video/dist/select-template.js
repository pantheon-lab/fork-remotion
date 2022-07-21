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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectTemplate = void 0;
const chalk_1 = __importDefault(require("chalk"));
const minimist_1 = __importDefault(require("minimist"));
const prompts_1 = __importStar(require("./prompts"));
const strip_ansi_1 = require("./strip-ansi");
const templates_1 = require("./templates");
const parsed = (0, minimist_1.default)(process.argv.slice(2), {
    boolean: templates_1.FEATURED_TEMPLATES.map((f) => f.cliId),
});
function padEnd(str, width) {
    // Pulled from commander for overriding
    const len = Math.max(0, width - (0, strip_ansi_1.stripAnsi)(str).length);
    return str + Array(len + 1).join(' ');
}
const descriptionColumn = Math.max(...templates_1.FEATURED_TEMPLATES.map((t) => typeof t === 'object' ? t.shortName.length : 0)) + 2;
const selectTemplate = async () => {
    const isFlagSelected = templates_1.FEATURED_TEMPLATES.find((f) => {
        return parsed[f.cliId];
    });
    if (isFlagSelected) {
        return isFlagSelected;
    }
    const selectedTemplate = (await (0, prompts_1.selectAsync)({
        message: 'Choose a template:',
        optionsPerPage: 20,
        choices: templates_1.FEATURED_TEMPLATES.map((template) => {
            if (typeof template === 'string') {
                return prompts_1.default.separator(template);
            }
            return {
                value: template,
                title: chalk_1.default.bold(padEnd(template.shortName, descriptionColumn)) +
                    template.description.trim(),
            };
        }),
    }, {}));
    return selectedTemplate;
};
exports.selectTemplate = selectTemplate;
