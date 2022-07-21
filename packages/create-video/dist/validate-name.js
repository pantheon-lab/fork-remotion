"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateName = void 0;
function validateName(name) {
    if (typeof name !== 'string' || name === '') {
        return 'The project name can not be empty.';
    }
    if (!/^[a-z0-9@.\-_]+$/i.test(name)) {
        return 'The project name can only contain URL-friendly characters (alphanumeric and @ . -  _)';
    }
    return true;
}
exports.validateName = validateName;
