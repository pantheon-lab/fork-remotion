"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bundler_1 = require("@remotion/bundler");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const quit_1 = require("../cli/helpers/quit");
const function_zip_path_1 = require("../shared/function-zip-path");
const zl = require("zip-lib");
const bundleLambda = async () => {
    var _a;
    const outdir = path_1.default.join(__dirname, '..', `build-render`);
    fs_1.default.mkdirSync(outdir, {
        recursive: true,
    });
    const outfile = path_1.default.join(outdir, 'index.js');
    ((_a = fs_1.default.rmSync) !== null && _a !== void 0 ? _a : fs_1.default.rmdirSync)(outdir, { recursive: true });
    fs_1.default.mkdirSync(outdir, { recursive: true });
    const template = require.resolve(path_1.default.join(__dirname, '..', 'functions', 'index'));
    await bundler_1.BundlerInternals.esbuild.build({
        platform: 'node',
        target: 'node14',
        bundle: true,
        outfile,
        entryPoints: [template],
    });
    await zl.archiveFolder(outdir, function_zip_path_1.FUNCTION_ZIP);
    fs_1.default.unlinkSync(outfile);
};
bundleLambda()
    .then(() => {
    console.log('Lambda bundled');
})
    .catch((err) => {
    console.log(err);
    (0, quit_1.quit)(1);
});
