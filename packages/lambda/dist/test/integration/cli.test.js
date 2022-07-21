"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@remotion/cli");
const defaults_1 = require("../../defaults");
const internals_1 = require("../../internals");
const console_hooks_1 = require("./console-hooks");
test('Deploy function', async () => {
    await internals_1.LambdaInternals.executeCommand(['functions', 'deploy']);
    expect((0, console_hooks_1.getProcessWriteOutput)()).toContain(`Deployed as remotion-render-${defaults_1.CURRENT_VERSION}-mem${defaults_1.DEFAULT_MEMORY_SIZE}mb-disk${defaults_1.DEFAULT_EPHEMERAL_STORAGE_IN_MB}mb-${defaults_1.DEFAULT_TIMEOUT}sec\n`);
});
test('Deploy function and list it', async () => {
    await internals_1.LambdaInternals.executeCommand(['functions', 'deploy']);
    await internals_1.LambdaInternals.executeCommand(['functions', 'ls']);
    expect((0, console_hooks_1.getProcessWriteOutput)()).toContain('Getting functions...');
    expect((0, console_hooks_1.getProcessWriteOutput)()).toContain('Memory (MB)');
    expect((0, console_hooks_1.getProcessWriteOutput)()).toMatch(/remotion-render-(.*)\s+2048\s+120/g);
});
test('Deploy function and it already exists should fail', async () => {
    await internals_1.LambdaInternals.executeCommand(['functions', 'deploy']);
    await internals_1.LambdaInternals.executeCommand(['functions', 'deploy']);
    expect((0, console_hooks_1.getProcessWriteOutput)()).toMatch(/Already exists as remotion-render/);
});
test('If no functions are there and is quiet, should return "()"', async () => {
    cli_1.CliInternals.parsedCli.q = true;
    await internals_1.LambdaInternals.executeCommand(['functions', 'ls']);
    expect((0, console_hooks_1.getProcessWriteOutput)()).toBe('()');
});
test('Should handle functions rm called with no functions', async () => {
    await internals_1.LambdaInternals.executeCommand(['functions', 'rm', '()']);
    expect((0, console_hooks_1.getProcessWriteOutput)()).toBe('No functions to remove.');
});
