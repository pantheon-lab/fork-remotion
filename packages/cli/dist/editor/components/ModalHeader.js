"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCompHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const modals_1 = require("../state/modals");
const layout_1 = require("./layout");
const CancelButton_1 = require("./NewComposition/CancelButton");
const container = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    width: '100%',
    borderBottom: '1px solid black',
};
const icon = {
    height: 20,
    width: 20,
};
const NewCompHeader = ({ title }) => {
    const { setSelectedModal } = (0, react_1.useContext)(modals_1.ModalsContext);
    const onPress = (0, react_1.useCallback)(() => {
        setSelectedModal(null);
    }, [setSelectedModal]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: [(0, jsx_runtime_1.jsx)("div", { children: title }), (0, jsx_runtime_1.jsx)(layout_1.Flex, {}), (0, jsx_runtime_1.jsx)(CancelButton_1.CancelButton, { style: icon, onPress: onPress })] }));
};
exports.NewCompHeader = NewCompHeader;
