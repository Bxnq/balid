export type DefaultOptions = {
    notExpectedType?: string;
};

export type NumberOptions = DefaultOptions & {
    min?: number;
    max?: number;

    gratherThanExpected?: string;
    lessThanExpected?: string;
}

export type StringOptions = DefaultOptions & {
    min?: number;
    max?: number;
    match?: RegExp;

    lessThanExpected?: string;
    gratherThanExpected?: string;
    notMatchPattern?: string;
}

export type ObjectOptions = DefaultOptions & {
    childNotMatch?: string;
}

export type ArrayOptions = DefaultOptions & {
    elementNotMatch?: string;
}

export type OptionalOptions = {
    notMatchSchema?: string;
}

export type OrOptions = {
    notMatchSchema?: string;
}

export type AndOptions = {
    notMatchSchema?: string;
}