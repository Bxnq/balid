export type Schema = {
    validate: (input: any) => Valid;
};

export type TypeParams = ((schema?: Schema) => Schema) | ((...schemas: Schema[]) => Schema);

export type Valid = {
    valid: boolean;
    errors: string[];
};

export type DefaultOptions = {
    notExpectedType?: string;
};

export type NumberOptions = DefaultOptions & {
    min?: number;
    max?: number;

    gratherThanExpected?: string;
    lessThanExpected?: string;
};

export type StringOptions = DefaultOptions & {
    min?: number;
    max?: number;
    match?: RegExp;

    lessThanExpected?: string;
    gratherThanExpected?: string;
    notMatchPattern?: string;
};

export type ObjectOptions = DefaultOptions & {
    childNotMatch?: string;
};

export type ArrayOptions = DefaultOptions & {
    elementNotMatch?: string;
};

export type OptionalOptions = {
    notMatchSchema?: string;
};

export type OrOptions = {
    notMatchSchema?: string;
};

export type AndOptions = {
    notMatchSchema?: string;
};
