"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSharedAudio = exports.SharedAudioContextProvider = exports.SharedAudioContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const EMPTY_AUDIO = 'data:audio/mp3;base64,/+MYxAAJcAV8AAgAABn//////+/gQ5BAMA+D4Pg+BAQBAEAwD4Pg+D4EBAEAQDAPg++hYBH///hUFQVBUFREDQNHmf///////+MYxBUGkAGIMAAAAP/29Xt6lUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDUAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
exports.SharedAudioContext = (0, react_1.createContext)(null);
const SharedAudioContextProvider = ({ children, numberOfAudioTags }) => {
    const [audios, setAudios] = (0, react_1.useState)([]);
    const [initialNumberOfAudioTags] = (0, react_1.useState)(numberOfAudioTags);
    if (numberOfAudioTags !== initialNumberOfAudioTags) {
        throw new Error('The number of shared audio tags has changed dynamically. Once you have set this property, you cannot change it afterwards.');
    }
    const refs = (0, react_1.useMemo)(() => {
        return new Array(numberOfAudioTags).fill(true).map(() => {
            return { id: Math.random(), ref: (0, react_1.createRef)() };
        });
    }, [numberOfAudioTags]);
    const takenAudios = (0, react_1.useRef)(new Array(numberOfAudioTags).fill(false));
    const registerAudio = (0, react_1.useCallback)((aud) => {
        const firstFreeAudio = takenAudios.current.findIndex((a) => a === false);
        if (firstFreeAudio === -1) {
            throw new Error(`Tried to simultaneously mount ${numberOfAudioTags + 1} <Audio /> tags at the same time. With the current settings, the maximum amount of <Audio /> tags is limited to ${numberOfAudioTags} at the same time. Remotion pre-mounts silent audio tags to help avoid browser autoplay restrictions. See https://remotion.dev/docs/player/autoplay#use-the-numberofsharedaudiotags-property for more information on how to increase this limit.`);
        }
        const { id, ref } = refs[firstFreeAudio];
        const cloned = [...takenAudios.current];
        cloned[firstFreeAudio] = id;
        takenAudios.current = cloned;
        const newElem = {
            props: aud,
            id,
            el: ref,
        };
        // We need a timeout because this state setting is triggered by another state being set, causing React to throw an error.
        // By setting a timeout, we are bypassing the error and allowing the state
        // to be updated in the next tick.
        // This can lead to a tiny delay of audio playback, improvement ideas are welcome.
        setTimeout(() => {
            setAudios((prevAudios) => [...prevAudios, newElem]);
        }, 4);
        return newElem;
    }, [numberOfAudioTags, refs]);
    const unregisterAudio = (0, react_1.useCallback)((id) => {
        const cloned = [...takenAudios.current];
        const index = refs.findIndex((r) => r.id === id);
        if (index === -1) {
            throw new TypeError('Error occured in ');
        }
        cloned[index] = false;
        takenAudios.current = cloned;
        setAudios((prevAudios) => {
            return prevAudios.filter((a) => a.id !== id);
        });
    }, [refs]);
    const updateAudio = (0, react_1.useCallback)((id, aud) => {
        setAudios((prevAudios) => {
            return prevAudios.map((prevA) => {
                if (prevA.id === id) {
                    return {
                        ...prevA,
                        props: aud,
                    };
                }
                return prevA;
            });
        });
    }, []);
    const playAllAudios = (0, react_1.useCallback)(() => {
        refs.forEach((ref) => {
            var _a;
            (_a = ref.ref.current) === null || _a === void 0 ? void 0 : _a.play();
        });
    }, [refs]);
    const value = (0, react_1.useMemo)(() => {
        return {
            registerAudio,
            unregisterAudio,
            updateAudio,
            playAllAudios,
            numberOfAudioTags,
        };
    }, [
        numberOfAudioTags,
        playAllAudios,
        registerAudio,
        unregisterAudio,
        updateAudio,
    ]);
    return ((0, jsx_runtime_1.jsxs)(exports.SharedAudioContext.Provider, { value: value, children: [refs.map(({ id, ref }) => {
                const data = audios.find((a) => a.id === id);
                if (data === undefined) {
                    return (0, jsx_runtime_1.jsx)("audio", { ref: ref, src: EMPTY_AUDIO }, id);
                }
                if (!data) {
                    throw new TypeError('Expected audio data to be there');
                }
                return (0, jsx_runtime_1.jsx)("audio", { ref: ref, ...data.props }, id);
            }), children] }));
};
exports.SharedAudioContextProvider = SharedAudioContextProvider;
const useSharedAudio = (aud) => {
    const ctx = (0, react_1.useContext)(exports.SharedAudioContext);
    const [elem] = (0, react_1.useState)(() => {
        if (ctx && ctx.numberOfAudioTags > 0) {
            return ctx.registerAudio(aud);
        }
        return {
            el: react_1.default.createRef(),
            id: Math.random(),
            props: aud,
        };
    });
    (0, react_1.useEffect)(() => {
        return () => {
            if (ctx && ctx.numberOfAudioTags > 0) {
                ctx.unregisterAudio(elem.id);
            }
        };
    }, [ctx, elem.id]);
    (0, react_1.useEffect)(() => {
        if (ctx && ctx.numberOfAudioTags > 0) {
            ctx.updateAudio(elem.id, aud);
        }
    }, [aud, ctx, elem.id]);
    return elem;
};
exports.useSharedAudio = useSharedAudio;
