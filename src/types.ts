export type SchemaType = {
	validate: (input: any) => boolean;
};

export const b: Record<string, (schema?) => SchemaType> = {
	any: () => {
		return {
			validate(input) {
				return true;
			},
		};
	},
	boolean: () => {
		return {
			validate(input: any) {
				return typeof input === "boolean";
			},
		};
	},
	number: () => {
		return {
			validate(input: any) {
				return typeof input === "number";
			},
		};
	},
	string: () => {
		return {
			validate(input: any) {
				return typeof input === "string";
			},
		};
	},
	object: (schema?: object) => {
		return {
			validate(input: any) {
				if (typeof input !== "object") return false;

				const entries: any[] = schema ? Object.keys(schema) : [];

				for (const key of entries) {
					if (!schema[key].validate(input[key])) {
						return false;
					}
				}

				return true;
			},
		};
	},
};
