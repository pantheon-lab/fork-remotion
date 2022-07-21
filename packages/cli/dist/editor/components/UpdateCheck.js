"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCheck = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const modals_1 = require("../state/modals");
const z_index_1 = require("../state/z-index");
const buttonStyle = {
    appearance: 'none',
    color: 'var(--blue)',
    border: 'none',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: 14,
};
const UpdateCheck = () => {
    const [info, setInfo] = (0, react_1.useState)(null);
    const { setSelectedModal } = (0, react_1.useContext)(modals_1.ModalsContext);
    const { tabIndex } = (0, z_index_1.useZIndex)();
    const checkForUpdates = (0, react_1.useCallback)(() => {
        const controller = new AbortController();
        fetch('/api/update', {
            signal: controller.signal,
        })
            .then((res) => res.json())
            .then((d) => {
            setInfo(d);
        })
            .catch((err) => {
            if (err.message.includes('aborted')) {
                return;
            }
            console.log('Could not check for updates', err);
        });
        return controller;
    }, []);
    (0, react_1.useEffect)(() => {
        const abortController = checkForUpdates();
        return () => {
            abortController.abort();
        };
    }, [checkForUpdates]);
    const openModal = (0, react_1.useCallback)(() => {
        setSelectedModal({
            type: 'update',
            info: info,
        });
    }, [info, setSelectedModal]);
    if (!info) {
        return null;
    }
    if (!info.updateAvailable) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("button", { tabIndex: tabIndex, style: buttonStyle, onClick: openModal, type: "button", children: "Update available!" }));
};
exports.UpdateCheck = UpdateCheck;
