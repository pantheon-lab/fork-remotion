export declare const isVsCodeDerivative: (editor: Editor) => boolean;
export declare function isTerminalEditor(editor: Editor): boolean;
declare const editorNames: readonly ["atom", "/Applications/Atom Beta.app/Contents/MacOS/Atom Beta", "brackets", "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl", "/Applications/Sublime Text Dev.app/Contents/SharedSupport/bin/subl", "/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl", "code", "code-insiders", "vscodium", "/Applications/AppCode.app/Contents/MacOS/appcode", "/Applications/CLion.app/Contents/MacOS/clion", "/Applications/IntelliJ IDEA.app/Contents/MacOS/idea", "/Applications/PhpStorm.app/Contents/MacOS/phpstorm", "/Applications/PyCharm.app/Contents/MacOS/pycharm", "/Applications/PyCharm CE.app/Contents/MacOS/pycharm", "/Applications/RubyMine.app/Contents/MacOS/rubymine", "/Applications/WebStorm.app/Contents/MacOS/webstorm", "/Applications/GoLand.app/Contents/MacOS/goland", "/Applications/Rider.app/Contents/MacOS/rider", "mvim", "emacs", "gvim", "idea", "phpstorm", "pycharm", "rubymine", "sublime_text", "vim", "webstorm", "goland", "rider", "Brackets.exe", "Code.exe", "Code - Insiders.exe", "VSCodium.exe", "atom.exe", "sublime_text.exe", "notepad++.exe", "clion.exe", "clion64.exe", "idea.exe", "idea64.exe", "phpstorm.exe", "phpstorm64.exe", "pycharm.exe", "pycharm64.exe", "rubymine.exe", "rubymine64.exe", "webstorm.exe", "webstorm64.exe", "goland.exe", "goland64.exe", "rider.exe", "rider64.exe", "nano"];
export declare const getDisplayNameForEditor: (editor: Editor) => string;
declare type Editor = typeof editorNames[number];
declare type ProcessAndCommand = {
    process: string;
    command: Editor;
};
export declare function guessEditor(): Promise<ProcessAndCommand[]>;
export declare function launchEditor({ colNumber, editor, fileName, lineNumber, vsCodeNewWindow, }: {
    fileName: string;
    lineNumber: number;
    colNumber: number;
    editor: ProcessAndCommand;
    vsCodeNewWindow: boolean;
}): Promise<boolean>;
export {};
