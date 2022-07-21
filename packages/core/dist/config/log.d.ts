export declare const logLevels: readonly ["verbose", "info", "warn", "error"];
export declare type LogLevel = typeof logLevels[number];
export declare const DEFAULT_LOG_LEVEL: LogLevel;
export declare const getLogLevel: () => "verbose" | "info" | "warn" | "error";
export declare const setLogLevel: (newLogLevel: LogLevel) => void;
export declare const isValidLogLevel: (level: string) => boolean;
export declare const isEqualOrBelowLogLevel: (currentLevel: LogLevel, level: LogLevel) => boolean;
