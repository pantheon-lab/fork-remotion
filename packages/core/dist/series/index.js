"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Series = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Sequence_1 = require("../Sequence");
const validate_duration_in_frames_1 = require("../validation/validate-duration-in-frames");
const flatten_children_1 = require("./flatten-children");
const SeriesSequence = ({ children }) => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
const Series = ({ children }) => {
    const childrenValue = (0, react_1.useMemo)(() => {
        let startFrame = 0;
        return react_1.Children.map((0, flatten_children_1.flattenChildren)(children), (child, i) => {
            var _a;
            const castedChild = child;
            if (typeof castedChild === 'string') {
                // Don't throw if it's just some accidential whitespace
                if (castedChild.trim() === '') {
                    return null;
                }
                throw new TypeError(`The <Series /> component only accepts a list of <Series.Sequence /> components as it's children, but you passed a string "${castedChild}"`);
            }
            if (castedChild.type !== SeriesSequence) {
                throw new TypeError(`The <Series /> component only accepts a list of <Series.Sequence /> components as it's children, but got ${castedChild} instead`);
            }
            const debugInfo = `index = ${i}, duration = ${castedChild.props.durationInFrames}`;
            if (!castedChild || !castedChild.props.children) {
                throw new TypeError(`A <Series.Sequence /> component (${debugInfo}) was detected to not have any children. Delete it to fix this error.`);
            }
            const durationInFramesProp = castedChild.props.durationInFrames;
            const { durationInFrames, children: _children, ...passedProps } = castedChild.props;
            (0, validate_duration_in_frames_1.validateDurationInFrames)(durationInFramesProp, `of a <Series.Sequence /> component`);
            const offset = (_a = castedChild.props.offset) !== null && _a !== void 0 ? _a : 0;
            if (Number.isNaN(offset)) {
                throw new TypeError(`The "offset" property of a <Series.Sequence /> must not be NaN, but got NaN (${debugInfo}).`);
            }
            if (!Number.isFinite(offset)) {
                throw new TypeError(`The "offset" property of a <Series.Sequence /> must be finite, but got ${offset} (${debugInfo}).`);
            }
            if (offset % 1 !== 0) {
                throw new TypeError(`The "offset" property of a <Series.Sequence /> must be finite, but got ${offset} (${debugInfo}).`);
            }
            const currentStartFrame = startFrame + offset;
            startFrame += durationInFramesProp + offset;
            return ((0, jsx_runtime_1.jsx)(Sequence_1.Sequence, { from: currentStartFrame, durationInFrames: durationInFramesProp, ...passedProps, children: child }));
        });
    }, [children]);
    /* eslint-disable react/jsx-no-useless-fragment */
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: childrenValue });
};
exports.Series = Series;
Series.Sequence = SeriesSequence;
