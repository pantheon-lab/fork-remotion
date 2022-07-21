import React from 'react';
interface RenderHookOptions<Props> {
    /**
     * The argument passed to the renderHook callback. Can be useful if you plan
     * to use the rerender utility to change the values passed to your hook.
     */
    initialProps?: Props;
    /**
     * Pass a React Component as the wrapper option to have it rendered around the inner element. This is most useful for creating
     *  reusable custom render functions for common data providers. See setup for examples.
     *
     *  @see https://testing-library.com/docs/react-testing-library/api/#wrapper
     */
    wrapper?: React.JSXElementConstructor<{
        children: React.ReactElement;
    }>;
}
export declare function renderHook<Result, Props>(renderCallback: (initialProps: Props) => Result, options?: RenderHookOptions<Props>): {
    result: React.RefObject<unknown>;
    rerender: (rerenderCallbackProps: Props) => void;
    unmount: () => void;
};
export {};
