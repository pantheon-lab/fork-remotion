"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuToolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const pick_color_1 = require("../helpers/pick-color");
const Checkmark_1 = require("../icons/Checkmark");
const checkerboard_1 = require("../state/checkerboard");
const modals_1 = require("../state/modals");
const preview_size_1 = require("../state/preview-size");
const rich_timeline_1 = require("../state/rich-timeline");
const sidebar_1 = require("../state/sidebar");
const timeline_ref_1 = require("../state/timeline-ref");
const layout_1 = require("./layout");
const MenuItem_1 = require("./Menu/MenuItem");
const MenuBuildIndicator_1 = require("./MenuBuildIndicator");
const SizeSelector_1 = require("./SizeSelector");
const TimelineInOutToggle_1 = require("./TimelineInOutToggle");
const UpdateCheck_1 = require("./UpdateCheck");
const row = {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    color: 'white',
    borderBottom: '1px solid black',
    fontSize: 13,
    paddingLeft: 6,
    paddingRight: 10,
};
const flex = {
    flex: 1,
};
const openExternal = (link) => {
    window.open(link, '_blank');
};
const rotate = {
    transform: `rotate(90deg)`,
};
const ICON_SIZE = 16;
const MenuToolbar = () => {
    const [selected, setSelected] = (0, react_1.useState)(null);
    const { setSelectedModal } = (0, react_1.useContext)(modals_1.ModalsContext);
    const { checkerboard, setCheckerboard } = (0, react_1.useContext)(checkerboard_1.CheckerboardContext);
    const { richTimeline, setRichTimeline } = (0, react_1.useContext)(rich_timeline_1.RichTimelineContext);
    const { size, setSize } = (0, react_1.useContext)(preview_size_1.PreviewSizeContext);
    const { setSidebarCollapsedState, sidebarCollapsedState } = (0, react_1.useContext)(sidebar_1.SidebarContext);
    const itemClicked = (0, react_1.useCallback)((itemId) => {
        setSelected(itemId);
    }, [setSelected]);
    const itemHovered = (0, react_1.useCallback)((itemId) => {
        if (selected) {
            setSelected(itemId);
        }
    }, [selected, setSelected]);
    const close = (0, react_1.useCallback)(() => {
        setSelected(null);
    }, []);
    const structure = (0, react_1.useMemo)(() => {
        const struct = [
            {
                id: 'remotion',
                label: ((0, jsx_runtime_1.jsx)(layout_1.Row, { align: "center", justify: "center", children: (0, jsx_runtime_1.jsx)("svg", { width: ICON_SIZE, height: ICON_SIZE, viewBox: "-100 -100 400 400", style: rotate, children: (0, jsx_runtime_1.jsx)("path", { fill: "#fff", stroke: "#fff", strokeWidth: "100", strokeLinejoin: "round", d: "M 2 172 a 196 100 0 0 0 195 5 A 196 240 0 0 0 100 2.259 A 196 240 0 0 0 2 172 z" }) }) })),
                leaveLeftPadding: false,
                items: [
                    {
                        id: 'about',
                        value: 'about',
                        label: 'About Remotion',
                        onClick: () => {
                            close();
                            openExternal('https://remotion.dev');
                        },
                        type: 'item',
                        keyHint: null,
                        leftItem: null,
                        subMenu: null,
                    },
                    {
                        id: 'changelog',
                        value: 'changelog',
                        label: 'Changelog',
                        onClick: () => {
                            close();
                            openExternal('https://github.com/remotion-dev/remotion/releases');
                        },
                        type: 'item',
                        keyHint: null,
                        leftItem: null,
                        subMenu: null,
                    },
                    {
                        id: 'license',
                        value: 'license',
                        label: 'License',
                        onClick: () => {
                            close();
                            openExternal('https://github.com/remotion-dev/remotion/blob/main/LICENSE.md');
                        },
                        type: 'item',
                        keyHint: null,
                        leftItem: null,
                        subMenu: null,
                    },
                ],
            },
            {
                id: 'file',
                label: 'File',
                leaveLeftPadding: false,
                items: [
                    {
                        id: 'new-sequence',
                        value: 'new-sequence',
                        label: 'New composition...',
                        onClick: () => {
                            close();
                            setSelectedModal({
                                compType: 'composition',
                                type: 'new-comp',
                            });
                        },
                        type: 'item',
                        keyHint: 'N',
                        leftItem: null,
                        subMenu: null,
                    },
                    {
                        id: 'new-still',
                        value: 'new-still',
                        label: 'New still...',
                        onClick: () => {
                            close();
                            setSelectedModal({
                                compType: 'still',
                                type: 'new-comp',
                            });
                        },
                        type: 'item',
                        keyHint: null,
                        leftItem: null,
                        subMenu: null,
                    },
                ],
            },
            {
                id: 'view',
                label: 'View',
                leaveLeftPadding: true,
                items: [
                    {
                        id: 'preview-size',
                        keyHint: null,
                        label: 'Preview size',
                        onClick: () => undefined,
                        type: 'item',
                        value: 'preview-size',
                        leftItem: null,
                        subMenu: {
                            leaveLeftSpace: true,
                            preselectIndex: SizeSelector_1.commonPreviewSizes.findIndex((s) => String(size) === String(s)),
                            items: SizeSelector_1.commonPreviewSizes.map((newSize) => ({
                                id: String(newSize),
                                keyHint: null,
                                label: (0, SizeSelector_1.getPreviewSizeLabel)(newSize),
                                leftItem: String(newSize) === String(size) ? (0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {}) : null,
                                onClick: () => {
                                    close();
                                    setSize(() => newSize);
                                },
                                subMenu: null,
                                type: 'item',
                                value: newSize,
                            })),
                        },
                    },
                    {
                        id: 'timeline-divider',
                        type: 'divider',
                    },
                    {
                        id: 'left-sidebar',
                        label: 'Sidebar',
                        keyHint: null,
                        type: 'item',
                        value: 'preview-size',
                        leftItem: null,
                        subMenu: {
                            leaveLeftSpace: true,
                            preselectIndex: 0,
                            items: [
                                {
                                    id: 'sidebar-responsive',
                                    keyHint: null,
                                    label: 'Responsive',
                                    leftItem: sidebarCollapsedState === 'responsive' ? ((0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {})) : null,
                                    onClick: () => {
                                        setSidebarCollapsedState('responsive');
                                    },
                                    subMenu: null,
                                    type: 'item',
                                    value: 'responsive',
                                },
                                {
                                    id: 'sidebar-expanded',
                                    keyHint: null,
                                    label: 'Expanded',
                                    leftItem: sidebarCollapsedState === 'expanded' ? (0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {}) : null,
                                    onClick: () => {
                                        setSidebarCollapsedState('expanded');
                                    },
                                    subMenu: null,
                                    type: 'item',
                                    value: 'expanded',
                                },
                                {
                                    id: 'sidebar-collapsed',
                                    keyHint: null,
                                    label: 'Collapsed',
                                    leftItem: sidebarCollapsedState === 'collapsed' ? ((0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {})) : null,
                                    onClick: () => {
                                        setSidebarCollapsedState('collapsed');
                                    },
                                    subMenu: null,
                                    type: 'item',
                                    value: 'collapsed',
                                },
                            ],
                        },
                        onClick: () => undefined,
                    },
                    {
                        id: 'timeline-divider',
                        type: 'divider',
                    },
                    {
                        id: 'checkerboard',
                        keyHint: 'T',
                        label: 'Transparency as checkerboard',
                        onClick: () => {
                            close();
                            setCheckerboard((c) => !c);
                        },
                        type: 'item',
                        value: 'checkerboard',
                        leftItem: checkerboard ? (0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {}) : null,
                        subMenu: null,
                    },
                    {
                        id: 'timeline-divider',
                        type: 'divider',
                    },
                    {
                        id: 'rich-timeline',
                        keyHint: null,
                        label: 'Rich timeline',
                        onClick: () => {
                            close();
                            setRichTimeline((r) => !r);
                        },
                        type: 'item',
                        value: 'rich-timeline',
                        leftItem: richTimeline ? (0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {}) : null,
                        subMenu: null,
                    },
                    {
                        id: 'expand-all',
                        keyHint: null,
                        label: 'Expand all',
                        onClick: () => {
                            var _a;
                            close();
                            (_a = timeline_ref_1.timelineRef.current) === null || _a === void 0 ? void 0 : _a.expandAll();
                        },
                        type: 'item',
                        value: 'expand-all',
                        leftItem: null,
                        subMenu: null,
                    },
                    {
                        id: 'collapse-all',
                        keyHint: null,
                        label: 'Collapse all',
                        onClick: () => {
                            var _a;
                            close();
                            (_a = timeline_ref_1.timelineRef.current) === null || _a === void 0 ? void 0 : _a.collapseAll();
                        },
                        type: 'item',
                        value: 'collapse-all',
                        leftItem: null,
                        subMenu: null,
                    },
                    {
                        id: 'in-out-divider',
                        type: 'divider',
                    },
                    {
                        id: 'in-mark',
                        keyHint: 'I',
                        label: 'In Mark',
                        leftItem: null,
                        onClick: () => {
                            var _a;
                            close();
                            (_a = TimelineInOutToggle_1.inOutHandles.current) === null || _a === void 0 ? void 0 : _a.inMarkClick();
                        },
                        subMenu: null,
                        type: 'item',
                        value: 'in-mark',
                    },
                    {
                        id: 'out-mark',
                        keyHint: 'O',
                        label: 'Out Mark',
                        leftItem: null,
                        onClick: () => {
                            var _a;
                            close();
                            (_a = TimelineInOutToggle_1.inOutHandles.current) === null || _a === void 0 ? void 0 : _a.outMarkClick();
                        },
                        subMenu: null,
                        type: 'item',
                        value: 'out-mark',
                    },
                    {
                        id: 'x-mark',
                        keyHint: 'X',
                        label: 'Clear In/Out Marks',
                        leftItem: null,
                        onClick: () => {
                            var _a;
                            close();
                            (_a = TimelineInOutToggle_1.inOutHandles.current) === null || _a === void 0 ? void 0 : _a.clearMarks();
                        },
                        subMenu: null,
                        type: 'item',
                        value: 'clear-marks',
                    },
                ],
            },
            'EyeDropper' in window
                ? {
                    id: 'tools',
                    label: 'Tools',
                    leaveLeftPadding: false,
                    items: [
                        {
                            id: 'color-picker',
                            value: 'color-picker',
                            label: 'Color Picker',
                            onClick: () => (0, pick_color_1.pickColor)(),
                            leftItem: null,
                            keyHint: null,
                            subMenu: null,
                            type: 'item',
                        },
                    ],
                }
                : null,
            {
                id: 'help',
                label: 'Help',
                leaveLeftPadding: false,
                items: [
                    {
                        id: 'shortcuts',
                        value: 'shortcuts',
                        label: 'Shortcuts',
                        onClick: () => {
                            close();
                            setSelectedModal({
                                type: 'shortcuts',
                            });
                        },
                        keyHint: '?',
                        leftItem: null,
                        subMenu: null,
                        type: 'item',
                    },
                    {
                        id: 'docs',
                        value: 'docs',
                        label: 'Docs',
                        onClick: () => {
                            close();
                            openExternal('https://remotion.dev/docs');
                        },
                        type: 'item',
                        keyHint: null,
                        leftItem: null,
                        subMenu: null,
                    },
                    {
                        id: 'file-issue',
                        value: 'file-issue',
                        label: 'File an issue',
                        onClick: () => {
                            close();
                            openExternal('https://github.com/remotion-dev/remotion/issues/new/choose');
                        },
                        type: 'item',
                        keyHint: null,
                        leftItem: null,
                        subMenu: null,
                    },
                    {
                        id: 'discord',
                        value: 'discord',
                        label: 'Join Discord community',
                        onClick: () => {
                            close();
                            openExternal('https://discord.com/invite/6VzzNDwUwV');
                        },
                        type: 'item',
                        keyHint: null,
                        leftItem: null,
                        subMenu: null,
                    },
                    {
                        id: 'help-divider',
                        type: 'divider',
                    },
                    {
                        id: 'insta',
                        value: 'insta',
                        label: 'Instagram',
                        onClick: () => {
                            close();
                            openExternal('https://instagram.com/remotion.dev');
                        },
                        type: 'item',
                        keyHint: null,
                        leftItem: null,
                        subMenu: null,
                    },
                    {
                        id: 'twitter',
                        value: 'twitter',
                        label: 'Twitter',
                        onClick: () => {
                            close();
                            openExternal('https://twitter.com/remotion_dev');
                        },
                        type: 'item',
                        keyHint: null,
                        leftItem: null,
                        subMenu: null,
                    },
                    {
                        id: 'tiktok',
                        value: 'tiktok',
                        label: 'TikTok',
                        onClick: () => {
                            close();
                            openExternal('https://www.tiktok.com/@remotion.dev');
                        },
                        type: 'item',
                        keyHint: null,
                        leftItem: null,
                        subMenu: null,
                    },
                ],
            },
        ].filter(remotion_1.Internals.truthy);
        return struct;
    }, [
        checkerboard,
        close,
        richTimeline,
        setCheckerboard,
        setRichTimeline,
        setSelectedModal,
        setSidebarCollapsedState,
        setSize,
        sidebarCollapsedState,
        size,
    ]);
    const menus = (0, react_1.useMemo)(() => {
        return structure.map((s) => s.id);
    }, [structure]);
    const onPreviousMenu = (0, react_1.useCallback)(() => {
        setSelected((s) => {
            if (s === null) {
                return null;
            }
            return menus[(menus.indexOf(s) + 1) % menus.length];
        });
    }, [menus]);
    const onNextMenu = (0, react_1.useCallback)(() => {
        setSelected((s) => {
            if (s === null) {
                return null;
            }
            if (menus.indexOf(s) === 0) {
                return menus[menus.length - 1];
            }
            return menus[(menus.indexOf(s) - 1) % menus.length];
        });
    }, [menus]);
    const onItemQuit = (0, react_1.useCallback)(() => {
        setSelected(null);
    }, [setSelected]);
    return ((0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", className: "css-reset", style: row, children: [structure.map((s) => {
                return ((0, jsx_runtime_1.jsx)(MenuItem_1.MenuItem, { selected: selected === s.id, onItemSelected: itemClicked, onItemHovered: itemHovered, id: s.id, label: s.label, onItemQuit: onItemQuit, menu: s, onPreviousMenu: onPreviousMenu, onNextMenu: onNextMenu, leaveLeftPadding: s.leaveLeftPadding }, s.id));
            }), (0, jsx_runtime_1.jsx)(UpdateCheck_1.UpdateCheck, {}), (0, jsx_runtime_1.jsx)("div", { style: flex }), (0, jsx_runtime_1.jsx)(MenuBuildIndicator_1.MenuBuildIndicator, {})] }));
};
exports.MenuToolbar = MenuToolbar;
