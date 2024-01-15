export type SchemaType = {
	validate: (input: any) => Valid;
};

export type TypeParams = ((schema?: SchemaType) => SchemaType) | ((...schemas: SchemaType[]) => SchemaType);

export type Valid = {
	valid: boolean;
	errors: string[];
};

const handle: () => Valid = () => {
	return {
		valid: true,
		errors: [],
	};
};

const check = (valid: Valid, check: boolean) => {
	if (!check) {
		valid.valid = false;
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
	boolean: () => {
		return {
			validate(input: any) {
				const valid = handle();

				check(valid, typeof input === "boolean");

				return valid;
			},
		};
	},
	number: (options?: { min?: number; max?: number }) => {
		let min = options?.min ?? undefined;
		let max = options?.max ?? undefined;

		return {
			validate(input: any) {
				const valid = handle();

				check(valid, typeof input === "number");

				if (min != undefined) {
					check(valid, input >= min);
				}

				if (max != undefined) {
					check(valid, input <= max);
				}

				return valid;
			},
		};
	},
	string: (options?: { min?: number; max?: number; match?: RegExp }) => {
		let min = options?.min ?? undefined;
		let max = options?.max ?? undefined;
		let match = options?.match ?? undefined;

		return {
			validate(input: any) {
				const valid = handle();

				check(valid, typeof input === "string");

				if (min != undefined) {
					check(valid, String(input).length >= min);
				}

				if (max != undefined) {
					check(valid, String(input).length <= max);
				}

				if (match != undefined) {
					check(valid, match.test(input));
				}

				return valid;
			},
		};
	},
	object: (schema?: object) => {
		return {
			validate(input: any) {
				let valid = handle();

				check(valid, typeof input === "object");

				const entries = schema ? Object.keys(schema) : [];

				for (const key of entries) {
					check(valid, schema[key].validate(input[key]).valid);
				}

				return valid;
			},
		};
	},
	array: (schema?: SchemaType) => {
		return {
			validate(input: any) {
				let valid = handle();

				check(valid, Array.isArray(input));

				if (!valid.valid) {
					return valid;
				}

				for (const value of input) {
					check(valid, schema.validate(value).valid);
				}

				return valid;
			},
		};
	},
};

export const util = {
	optional: (schema?: SchemaType) => {
		return {
			validate(input?: any) {
				let valid = handle();

				check(valid, input == undefined || schema.validate(input).valid);

				return valid;
			},
		};
	},
	or: (...schemas: SchemaType[]) => {
		return {
			validate(input) {
				let valid = handle();

				for (const schema of schemas) {
					if (schema.validate(input).valid) {
						return {
							valid: true,
							errors: [],
						};
					}
				}

				return { valid: false, errors: [] };
			},
		};
	},
	and: (...schemas: SchemaType[]) => {
		return {
			validate(input) {
				let valid = handle();

				for (const schema of schemas) {
					if (!schema.validate(input).valid) {
						return {
							valid: false,
							errors: [],
						};
					}
				}

				return valid;
			},
		};
	},
};
