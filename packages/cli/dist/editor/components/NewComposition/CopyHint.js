"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyHint = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const style = {
    fontSize: 12,
    color: colors_1.LIGHT_TEXT,
};
const CopyHint = () => {
    const [projectInfo, setProjectInfo] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        fetch(`/api/project-info`)
            .then((res) => res.json())
            .then((res) => {
            setProjectInfo(res);
        })
            .catch((err) => {
            console.log('Error fetching info about the project', err);
            setProjectInfo(null);
        });
    }, []);
    if (!projectInfo || !projectInfo.videoFile) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: style, children: ["Copy this into ", (0, jsx_runtime_1.jsx)("br", {}), " your", ' ', (0, jsx_runtime_1.jsx)("span", { style: style, title: projectInfo.videoFile, children: projectInfo.relativeVideoFile }), ' ', "file."] }));
};
exports.CopyHint = CopyHint;
