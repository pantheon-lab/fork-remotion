export declare const BACKGROUND = "#1f2428";
export declare const INPUT_BACKGROUND = "#2f363d";
export declare const BORDER_COLOR = "#000";
export declare const LIGHT_COLOR = "#ddd";
export declare const SELECTED_BACKGROUND = "hsla(0, 0%, 100%, 0.15)";
export declare const LIGHT_TEXT = "rgba(255, 255, 255, 0.6)";
export declare const SELECTED_HOVER_BACKGROUND = "hsla(0, 0%, 100%, 0.25)";
export declare const CLEAR_HOVER = "rgba(255, 255, 255, 0.06)";
export declare const INPUT_BORDER_COLOR_UNHOVERED = "rgba(0, 0, 0, 0.6)";
export declare const INPUT_BORDER_COLOR_HOVERED = "rgba(255, 255, 255, 0.05)";
export declare const getBackgroundFromHoverState: ({ selected, hovered, }: {
    selected: boolean;
    hovered: boolean;
}) => "hsla(0, 0%, 100%, 0.15)" | "hsla(0, 0%, 100%, 0.25)" | "rgba(255, 255, 255, 0.06)" | "transparent";
