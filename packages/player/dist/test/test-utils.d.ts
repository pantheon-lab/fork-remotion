import type { queries, RenderOptions } from '@testing-library/react';
import type { FC, ReactElement } from 'react';
declare const HelloWorld: FC;
declare const customRender: (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) => import("@testing-library/react").RenderResult<typeof queries, HTMLElement, HTMLElement>;
export * from '@testing-library/react';
export { customRender as render, HelloWorld };