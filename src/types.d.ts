type SchemaType = {
    validate: (input: any) => Valid;
};

type TypeParams = ((schema?: SchemaType) => SchemaType) | ((...schemas: SchemaType[]) => SchemaType);

type Valid = {
    valid: boolean;
    errors: string[];
};