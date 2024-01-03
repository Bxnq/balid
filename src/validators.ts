export type SchemaType = {
	validate: (input: any) => Valid;
};

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

export const b: Record<string, (schema?) => SchemaType> = {
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
	number: () => {
		return {
			validate(input: any) {
				const valid = handle();

				check(valid, typeof input === "number");

				return valid;
			},
		};
	},
	string: () => {
		return {
			validate(input: any) {
				const valid = handle();

				check(valid, typeof input === "string");

				return valid;
			},
		};
	},
	object: (schema?: Record<string, SchemaType>) => {
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
};
