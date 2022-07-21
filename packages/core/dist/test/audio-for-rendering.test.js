"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * @vitest-environment jsdom
 */
const react_1 = require("@testing-library/react");
const react_2 = __importDefault(require("react"));
const vitest_1 = require("vitest");
const AudioForRendering_1 = require("../audio/AudioForRendering");
const CanUseRemotionHooks_1 = require("../CanUseRemotionHooks");
const internals_1 = require("../internals");
const expect_to_throw_1 = require("./expect-to-throw");
let mockContext;
(0, vitest_1.describe)('Register and unregister asset', () => {
    function createMockContext() {
        const registerAsset = vitest_1.vitest.fn();
        const unregisterAsset = vitest_1.vitest.fn();
        const MockProvider = ({ children }) => {
            return ((0, jsx_runtime_1.jsx)(CanUseRemotionHooks_1.CanUseRemotionHooksProvider, { children: (0, jsx_runtime_1.jsx)(internals_1.Internals.CompositionManager.Provider, { value: 
                    // eslint-disable-next-line react/jsx-no-constructed-context-values
                    {
                        registerAsset,
                        unregisterAsset,
                    }, children: children }) }));
        };
        return {
            MockProvider,
            registerAsset,
            unregisterAsset,
        };
    }
    (0, vitest_1.beforeEach)(() => {
        mockContext = createMockContext();
    });
    (0, vitest_1.test)('register and unregister asset', () => {
        const props = {
            src: 'test',
            muted: false,
            volume: 50,
        };
        const { unmount } = (0, react_1.render)((0, jsx_runtime_1.jsx)(CanUseRemotionHooks_1.CanUseRemotionHooksProvider, { children: (0, jsx_runtime_1.jsx)(mockContext.MockProvider, { children: (0, jsx_runtime_1.jsx)(AudioForRendering_1.AudioForRendering, { ...props }) }) }));
        (0, vitest_1.expect)(mockContext.registerAsset).toHaveBeenCalled();
        unmount();
        (0, vitest_1.expect)(mockContext.unregisterAsset).toHaveBeenCalled();
    });
    (0, vitest_1.test)('no src passed', () => {
        const props = {
            src: undefined,
            muted: false,
            volume: 50,
        };
        (0, expect_to_throw_1.expectToThrow)(() => {
            (0, react_1.render)((0, jsx_runtime_1.jsx)(CanUseRemotionHooks_1.CanUseRemotionHooksProvider, { children: (0, jsx_runtime_1.jsx)(mockContext.MockProvider, { children: (0, jsx_runtime_1.jsx)(AudioForRendering_1.AudioForRendering, { ...props }) }) }));
        }, /No src passed/);
        (0, vitest_1.expect)(mockContext.registerAsset).not.toHaveBeenCalled();
        (0, vitest_1.expect)(mockContext.unregisterAsset).not.toHaveBeenCalled();
    });
});
let mockUseEffect;
(0, vitest_1.describe)('useEffect tests', () => {
    const useEffectSpy = vitest_1.vitest.spyOn(react_2.default, 'useEffect');
    mockUseEffect = vitest_1.vitest.fn();
    (0, vitest_1.beforeAll)(() => {
        useEffectSpy.mockImplementation(() => {
            mockUseEffect();
        });
    });
    (0, vitest_1.afterAll)(() => {
        useEffectSpy.mockRestore();
    });
    vitest_1.test.skip('has registered', () => {
        const props = {
            src: 'test',
            muted: false,
            volume: 50,
        };
        (0, react_1.render)((0, jsx_runtime_1.jsxs)(CanUseRemotionHooks_1.CanUseRemotionHooksProvider, { children: [(0, jsx_runtime_1.jsx)(AudioForRendering_1.AudioForRendering, { ...props }), ' '] }));
        (0, vitest_1.expect)(mockUseEffect).toHaveBeenCalled();
    });
});
