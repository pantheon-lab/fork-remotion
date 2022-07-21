import type { Options, PromptObject } from 'prompts';
import prompts from 'prompts';
export declare type Question<V extends string = string> = PromptObject<V> & {
    optionsPerPage?: number;
};
export declare type NamelessQuestion = Omit<Question<'value'>, 'name' | 'type'>;
declare type PromptOptions = {
    nonInteractiveHelp?: string;
} & Options;
declare function prompt(questions: Question | Question[], { nonInteractiveHelp, ...options }?: PromptOptions): Promise<prompts.Answers<string>>;
declare namespace prompt {
    var separator: (title: string) => {
        title: string;
        disabled: boolean;
        value: undefined;
    };
}
export default prompt;
export declare function selectAsync(questions: NamelessQuestion, options?: PromptOptions): Promise<unknown>;
