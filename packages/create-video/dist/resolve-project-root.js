"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveProjectRoot = void 0;
const chalk_1 = __importDefault(require("chalk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const log_1 = require("./log");
const mkdirp_1 = require("./mkdirp");
const prompts_1 = __importDefault(require("./prompts"));
const validate_name_1 = require("./validate-name");
function assertValidName(folderName) {
    const validation = (0, validate_name_1.validateName)(folderName);
    if (typeof validation === 'string') {
        throw new Error(`Cannot create an app named ${chalk_1.default.red(`"${folderName}"`)}. ${validation}`);
    }
}
function assertFolderEmptyAsync(projectRoot) {
    const conflicts = fs_1.default
        .readdirSync(projectRoot)
        .filter((file) => !/\.iml$/.test(file));
    if (conflicts.length > 0) {
        log_1.Log.newLine();
        log_1.Log.error(`Something already exists at "${projectRoot}"`);
        log_1.Log.error('Try using a new directory name, or moving these files.');
        log_1.Log.newLine();
        return { exists: true };
    }
    return { exists: false };
}
const resolveProjectRoot = async () => {
    let projectName = '';
    try {
        const { answer } = await (0, prompts_1.default)({
            type: 'text',
            name: 'answer',
            message: 'What would you like to name your video?',
            initial: 'my-video',
            validate: (name) => {
                const validation = (0, validate_name_1.validateName)(path_1.default.basename(path_1.default.resolve(name)));
                if (typeof validation === 'string') {
                    return 'Invalid project name: ' + validation;
                }
                return true;
            },
        });
        if (typeof answer === 'string') {
            projectName = answer.trim();
        }
    }
    catch (error) {
        // Handle the aborted message in a custom way.
        if (error.code !== 'ABORTED') {
            throw error;
        }
    }
    const projectRoot = path_1.default.resolve(projectName);
    const folderName = path_1.default.basename(projectRoot);
    assertValidName(folderName);
    (0, mkdirp_1.mkdirp)(projectRoot);
    if (assertFolderEmptyAsync(projectRoot).exists) {
        return (0, exports.resolveProjectRoot)();
    }
    return [projectRoot, folderName];
};
exports.resolveProjectRoot = resolveProjectRoot;
