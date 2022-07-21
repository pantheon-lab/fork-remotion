"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineVideoInfo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const media_utils_1 = require("@remotion/media-utils");
const react_1 = require("react");
const timeline_layout_1 = require("../../helpers/timeline-layout");
const containerStyle = {
    height: timeline_layout_1.TIMELINE_LAYER_HEIGHT,
    width: timeline_layout_1.TIMELINE_LAYER_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 2,
    fontSize: 10,
    fontFamily: 'Arial, Helvetica',
};
const svgStyle = {
    height: 20,
};
const pathStyle = {
    color: '#8e44ad',
};
const TimelineVideoInfo = ({ src }) => {
    const mountState = (0, react_1.useRef)({ isMounted: true });
    const [videoMetadata, setVideoMetadata] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        (0, media_utils_1.getVideoMetadata)(src)
            .then((data) => {
            setVideoMetadata(data);
        })
            .catch((err) => {
            console.log('Could not get video metadata', err);
        });
    }, [src]);
    (0, react_1.useEffect)(() => {
        const { current } = mountState;
        current.isMounted = true;
        return () => {
            current.isMounted = false;
        };
    }, []);
    if (!videoMetadata) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { style: containerStyle, children: (0, jsx_runtime_1.jsx)("svg", { style: svgStyle, role: "img", viewBox: "0 0 576 512", children: (0, jsx_runtime_1.jsx)("path", { style: pathStyle, fill: "currentColor", d: "M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z" }) }) }));
};
exports.TimelineVideoInfo = TimelineVideoInfo;
