"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const chalk_1 = __importDefault(require("chalk"));
const execa_1 = __importDefault(require("execa"));
const degit_1 = require("./degit");
const log_1 = require("./log");
const open_in_editor_flow_1 = require("./open-in-editor-flow");
const patch_package_json_1 = require("./patch-package-json");
const patch_readme_1 = require("./patch-readme");
const pkg_managers_1 = require("./pkg-managers");
const resolve_project_root_1 = require("./resolve-project-root");
const select_template_1 = require("./select-template");
const isGitExecutableAvailable = async () => {
    try {
        await (0, execa_1.default)('git', ['--version']);
        return true;
    }
    catch (e) {
        if (e.errno === 'ENOENT') {
            log_1.Log.warn('Unable to find `git` command. `git` not in PATH.');
            return false;
        }
    }
};
const initGitRepoAsync = async (root) => {
    // not in git tree, so let's init
    try {
        await (0, execa_1.default)('git', ['init'], { cwd: root });
        await (0, execa_1.default)('git', ['add', '--all'], { cwd: root, stdio: 'ignore' });
        await (0, execa_1.default)('git', ['commit', '-m', 'Create new Remotion video'], {
            cwd: root,
            stdio: 'ignore',
        });
        await (0, execa_1.default)('git', ['branch', '-M', 'main'], {
            cwd: root,
            stdio: 'ignore',
        });
    }
    catch (e) {
        log_1.Log.error('Error creating git repository:', e);
        log_1.Log.error('Project has been created nonetheless.');
        // no-op -- this is just a convenience and we don't care if it fails
    }
};
const init = async () => {
    var _a, _b, _c, _d, _e, _f;
    const [projectRoot, folderName] = await (0, resolve_project_root_1.resolveProjectRoot)();
    await isGitExecutableAvailable();
    const selectedTemplate = await (0, select_template_1.selectTemplate)();
    const pkgManager = (0, pkg_managers_1.selectPackageManager)();
    try {
        await (0, degit_1.degit)({
            repoOrg: selectedTemplate.org,
            repoName: selectedTemplate.repoName,
            dest: projectRoot,
        });
        (0, patch_readme_1.patchReadmeMd)(projectRoot, pkgManager);
        (0, patch_package_json_1.patchPackageJson)(projectRoot, folderName);
    }
    catch (e) {
        log_1.Log.error(e);
        log_1.Log.error('Error with template cloning. Aborting');
        process.exit(1);
    }
    log_1.Log.info(`Copied ${chalk_1.default.blueBright(selectedTemplate.shortName)} to ${chalk_1.default.blueBright(folderName)}. Installing dependencies...`);
    if (pkgManager === 'yarn') {
        log_1.Log.info('> yarn');
        const promise = (0, execa_1.default)('yarn', [], {
            cwd: projectRoot,
            stdio: 'inherit',
            env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
        });
        (_a = promise.stderr) === null || _a === void 0 ? void 0 : _a.pipe(process.stderr);
        (_b = promise.stdout) === null || _b === void 0 ? void 0 : _b.pipe(process.stdout);
        await promise;
    }
    else if (pkgManager === 'pnpm') {
        log_1.Log.info('> pnpm i');
        const promise = (0, execa_1.default)('pnpm', ['i'], {
            cwd: projectRoot,
            stdio: 'inherit',
            env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
        });
        (_c = promise.stderr) === null || _c === void 0 ? void 0 : _c.pipe(process.stderr);
        (_d = promise.stdout) === null || _d === void 0 ? void 0 : _d.pipe(process.stdout);
        await promise;
    }
    else {
        log_1.Log.info('> npm install');
        const promise = (0, execa_1.default)('npm', ['install', '--no-fund'], {
            stdio: 'inherit',
            cwd: projectRoot,
            env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
        });
        (_e = promise.stderr) === null || _e === void 0 ? void 0 : _e.pipe(process.stderr);
        (_f = promise.stdout) === null || _f === void 0 ? void 0 : _f.pipe(process.stdout);
        await promise;
    }
    await initGitRepoAsync(projectRoot);
    log_1.Log.info();
    log_1.Log.info(`Welcome to ${chalk_1.default.blueBright('Remotion')}!`);
    log_1.Log.info(`✨ Your video has been created at ${chalk_1.default.blueBright(folderName)}.`);
    await (0, open_in_editor_flow_1.openInEditorFlow)(projectRoot);
    log_1.Log.info('Get started by running');
    log_1.Log.info(chalk_1.default.blueBright(`cd ${folderName}`));
    log_1.Log.info(chalk_1.default.blueBright((0, pkg_managers_1.getStartCommand)(pkgManager)));
    log_1.Log.info('');
    log_1.Log.info('To render a video, run');
    log_1.Log.info(chalk_1.default.blueBright((0, pkg_managers_1.getRenderCommand)(pkgManager)));
    log_1.Log.info('');
    log_1.Log.info('Docs to get you started:', chalk_1.default.underline('https://www.remotion.dev/docs/the-fundamentals'));
    log_1.Log.info('Enjoy Remotion!');
};
exports.init = init;
