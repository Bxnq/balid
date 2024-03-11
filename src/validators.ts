import { AndOptions, ArrayOptions, DefaultOptions, NumberOptions, ObjectOptions, OptionalOptions, OrOptions, Schema, StringOptions, Valid } from "types.js";

const handle: () => Valid = () => {
    return {
        valid: true,
        errors: [],
    };
};

const check = (valid: Valid, check: boolean, errorMessage?: string) => {
    if (!check) {
        valid.valid = false;

        errorMessage && valid.errors.push(errorMessage);
    }

    return;
};

export const types = {
    any: () => {
        return {
            validate(input) {
                return { valid: true, errors: [] };
            },
        };
    },
    boolean: (options?: DefaultOptions) => {
        return {
            validate(input: any) {
                const valid = handle();

                check(valid, typeof input === "boolean", options?.notExpectedType ?? "Not a boolean");

                return valid;
            },
        };
    },
    number: (options?: NumberOptions) => {
        let min = options?.min ?? undefined;
        let max = options?.max ?? undefined;

        return {
            validate(input: any) {
                const valid = handle();

                check(valid, typeof input === "number", options?.notExpectedType ?? "Not a number");

                if (min != undefined) {
                    check(valid, input >= min, options?.gratherThanExpected ?? "Number is less than expected");
                }

                if (max != undefined) {
                    check(valid, input <= max, options?.lessThanExpected ?? "Number is grather than expected");
                }

                return valid;
            },
        };
    },
    string: (options?: StringOptions) => {
        let min = options?.min ?? undefined;
        let max = options?.max ?? undefined;
        let match = options?.match ?? undefined;

        return {
            validate(input: any) {
                const valid = handle();

                check(valid, typeof input === "string", options?.notExpectedType ?? "Not a string");

                if (min != undefined) {
                    check(valid, String(input).length >= min, options?.lessThanExpected ?? "String is less than expected");
                }

                if (max != undefined) {
                    check(valid, String(input).length <= max, options?.gratherThanExpected ?? "String is grather than expected");
                }

                if (match != undefined) {
                    check(valid, match.test(input), options?.notMatchPattern ?? "String does not match pattern");
                }

                return valid;
            },
        };
    },
    object: (schema?: object, options?: ObjectOptions) => {
        return {
            validate(input: any) {
                let valid = handle();

                check(valid, typeof input === "object", options?.notExpectedType ?? "Not an object");

                const entries = schema ? Object.keys(schema) : [];

                for (const key of entries) {
                    const validateKey: Valid = schema[key].validate(input[key]);

                    check(valid, validateKey.valid);

                    valid.errors.push(...validateKey.errors.map((error) => key + ": " + error));
                }

                return valid;
            },
        };
    },
    array: (schema?: Schema, options?: ArrayOptions) => {
        return {
            validate(input: any) {
                let valid = handle();

                check(valid, Array.isArray(input), options?.notExpectedType ?? "Not an array");

                if (!valid.valid) {
                    return valid;
                }

                for (let i = 0; i < input.length; i++) {
                    const value = input[i];
                    
                    const validateValue = schema.validate(value);
                    
                    check(valid, validateValue.valid);
                
                    valid.errors.push(...validateValue.errors.map((error) => i + ": " + error));
                }

                return valid;
            },
        };
    },
};

export const util = {
    optional: (schema?: Schema, options?: OptionalOptions) => {
        return {
            validate(input?: any) {
                let valid = handle();

                check(valid, input == undefined || schema.validate(input).valid, options?.notMatchSchema ?? "Optional does not match schema");

                return valid;
            },
        };
    },
    or: (options: OrOptions, ...schemas: Schema[]) => {
        return {
            validate(input) {
                let valid = handle();

                for (const schema of schemas) {
                    const validate = schema.validate(input);

                    if (validate.valid) {
                        valid.valid = true;
            
                        return valid;
                    }
                }

                return { valid: false, errors: [options.notMatchSchema ?? "Or does not match schema"] };
            },
        };
    },
    and: (options: AndOptions, ...schemas: Schema[]) => {
        return {
            validate(input) {
                let valid = handle();

                for (const schema of schemas) {
                    if (!schema.validate(input).valid) {
                        return {
                            valid: false,
                            errors: [options.notMatchSchema ?? "And does not match schema"],
                        };
                    }
                }

                return valid;
            },
        };
    },
};
