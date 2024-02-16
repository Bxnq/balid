import { b } from "../src/index";

describe("basic", () => {
    test("any", () => {
        const schema = b.any();

        const validateNumber = schema.validate(2);

        expect(validateNumber.valid).toBe(true);
        expect(validateNumber.errors).toEqual([]);

        const validateString = schema.validate("test");

        expect(validateString.valid).toBe(true);
        expect(validateString.errors).toEqual([]);

        const validateObject = schema.validate({ foo: "bar" });

        expect(validateObject.valid).toBe(true);
        expect(validateObject.errors).toEqual([]);

        const validateBoolean = schema.validate(true);

        expect(validateBoolean.valid).toBe(true);
        expect(validateBoolean.errors).toEqual([]);
    });

    test("boolean", () => {
        const schema = b.boolean();

        const validateTrue = schema.validate(true);

        expect(validateTrue.valid).toBe(true);
        expect(validateTrue.errors).toEqual([]);

        const validateFalse = schema.validate(false);

        expect(validateFalse.valid).toBe(true);
        expect(validateFalse.errors).toEqual([]);

        const validateNumber = schema.validate(2);

        expect(validateNumber.valid).toBe(false);
        expect(validateNumber.errors).toEqual(["Not a boolean"]);

        const validateString = schema.validate("hello world");

        expect(validateString.valid).toBe(false);
        expect(validateString.errors).toEqual(["Not a boolean"]);

        const validateObject = schema.validate({ foo: "bar" });

        expect(validateObject.valid).toBe(false);
        expect(validateObject.errors).toEqual(["Not a boolean"]);
    });

    test("string", () => {
        const schema = b.string();

        const validateString = schema.validate("hello world");

        expect(validateString.valid).toBe(true);
        expect(validateString.errors).toEqual([]);

        const validateNumber = schema.validate(2);

        expect(validateNumber.valid).toBe(false);
        expect(validateNumber.errors).toEqual(["Not a string"]);

        const validateBoolean = schema.validate(true);

        expect(validateBoolean.valid).toBe(false);
        expect(validateBoolean.errors).toEqual(["Not a string"]);

        const validateObject = schema.validate({ foo: "bar" });

        expect(validateObject.valid).toBe(false);
        expect(validateObject.errors).toEqual(["Not a string"]);

        const minSchema = b.string({ min: 5 });

        const validateMin = minSchema.validate("hello world");

        expect(validateMin.valid).toBe(true);
        expect(validateMin.errors).toEqual([]);

        const validateMinFalse = minSchema.validate("aaa");

        expect(validateMinFalse.valid).toBe(false);
        expect(validateMinFalse.errors).toEqual(["String is less than expected"]);

        const maxSchema = b.string({ max: 5 });

        const validateMax = maxSchema.validate("hello world");

        expect(validateMax.valid).toBe(false);
        expect(validateMax.errors).toEqual(["String is grather than expected"]);

        const validateMaxTrue = maxSchema.validate("test");

        expect(validateMaxTrue.valid).toBe(true);
        expect(validateMaxTrue.errors).toEqual([]);

        const matchSchema = b.string({ match: /hello/ });

        const validateMatch = matchSchema.validate("hello");

        expect(validateMatch.valid).toBe(true);
        expect(validateMatch.errors).toEqual([]);

        const validateMatchFalse = matchSchema.validate("world");

        expect(validateMatchFalse.valid).toBe(false);
        expect(validateMatchFalse.errors).toEqual(["String does not match pattern"]);
    });

    test("number", () => {
        const schema = b.number();

		const validateNumber = schema.validate(2);

		expect(validateNumber.valid).toBe(true);
		expect(validateNumber.errors).toEqual([]);

		const validateString = schema.validate("hello world");

		expect(validateString.valid).toBe(false);
		expect(validateString.errors).toEqual(["Not a number"]);

		const validateBoolean = schema.validate(true);

		expect(validateBoolean.valid).toBe(false);
		expect(validateBoolean.errors).toEqual(["Not a number"]);

		const validateObject = schema.validate({ foo: "bar" });

		expect(validateObject.valid).toBe(false);
		expect(validateObject.errors).toEqual(["Not a number"]);

		const minSchema = b.number({ min: 5 });

		const validateMin = minSchema.validate(2);

		expect(validateMin.valid).toBe(false);
		expect(validateMin.errors).toEqual(["Number is less than expected"]);

		const validateMinTrue = minSchema.validate(8);

		expect(validateMinTrue.valid).toBe(true);
		expect(validateMinTrue.errors).toEqual([]);

		const maxSchema = b.number({ max: 5 });

		const validateMax = maxSchema.validate(2);

		expect(validateMax.valid).toBe(true);
		expect(validateMax.errors).toEqual([]);

		const validateMaxFalse = maxSchema.validate(8);

		expect(validateMaxFalse.valid).toBe(false);
		expect(validateMaxFalse.errors).toEqual(["Number is grather than expected"]);
    });
});

describe("advanced", () => {
    test("object", () => {
        const schema = b.object({
            name: b.string(),
            age: b.optional(b.number()),
        });

		const validateNumber = schema.validate(2);

		expect(validateNumber.valid).toBe(false);
		expect(validateNumber.errors).toEqual(["Not an object", "name: Not a string"]);

		const validateString = schema.validate("hello world");

		expect(validateString.valid).toBe(false);
		expect(validateString.errors).toEqual(["Not an object", "name: Not a string"]);

		const validateBoolean = schema.validate(true);

		expect(validateBoolean.valid).toBe(false);
		expect(validateBoolean.errors).toEqual(["Not an object", "name: Not a string"]);

		const validateObject = schema.validate({ foo: "bar" });

		expect(validateObject.valid).toBe(false);
		expect(validateObject.errors).toEqual(["name: Not a string"]);

		const validateObject2 = schema.validate({ name: "test", age: "hello world" });

		expect(validateObject2.valid).toBe(false);
		expect(validateObject2.errors).toEqual(["age: Optional does not match schema"]);

		const validateObject3 = schema.validate({ name: "test", age: 2 });

        expect(validateObject3.valid).toBe(true);
        expect(validateObject3.errors).toEqual([]);
    });
    test("array", () => {
        const schema = b.array(b.string());

        const validateNumber = schema.validate(2);

        expect(validateNumber.valid).toBe(false);
        expect(validateNumber.errors).toEqual(["Not an array"]);

        const validateString = schema.validate("hello world");

        expect(validateString.valid).toBe(false);
        expect(validateString.errors).toEqual(["Not an array"]);

        const validateBoolean = schema.validate(true);

        expect(validateBoolean.valid).toBe(false);
        expect(validateBoolean.errors).toEqual(["Not an array"]);

        const validateObject = schema.validate({ foo: "bar" });

        expect(validateObject.valid).toBe(false);
        expect(validateObject.errors).toEqual(["Not an array"]);

        const validateArray = schema.validate(["test", "2"]);

        expect(validateArray.valid).toBe(true);
        expect(validateArray.errors).toEqual([]);

        const validateArray2 = schema.validate(["test", 2]);

        expect(validateArray2.valid).toBe(false);
        expect(validateArray2.errors).toEqual(["1: Not a string"]);

        const schema2 = b.array(b.or({}, b.string(), b.number()));

        const validateArray3 = schema2.validate(["test", 2]);

        expect(validateArray3.valid).toBe(true);
        expect(validateArray3.errors).toEqual([]);

        const validateArray4 = schema2.validate(["test", "2"]);

        expect(validateArray4.valid).toBe(true);
        expect(validateArray4.errors).toEqual([]);

        const validateArray5 = schema2.validate(["test", true]);

        expect(validateArray5.valid).toBe(false);
        expect(validateArray5.errors).toEqual(["1: Or does not match schema"]);

        const validateArray6 = schema2.validate(["test", { foo: "bar" }]);

        expect(validateArray6.valid).toBe(false);
        expect(validateArray6.errors).toEqual(["1: Or does not match schema"]);

        const validateArray7 = schema2.validate(["test", ["foo", "bar"]]);

        expect(validateArray7.valid).toBe(false);
        expect(validateArray7.errors).toEqual(["1: Or does not match schema"]);
    });
});

describe("util", () => {
    test("optional", () => {
        const schema = b.optional(b.string());

        const validateString = schema.validate("hello world");

        expect(validateString.valid).toBe(true);
        expect(validateString.errors).toEqual([]);

        const validateUndefined = schema.validate();

        expect(validateUndefined.valid).toBe(true);
        expect(validateUndefined.errors).toEqual([]);

        const validateNumber = schema.validate(2);

        expect(validateNumber.valid).toBe(false);
        expect(validateNumber.errors).toEqual(["Optional does not match schema"]);
    });
    test("or", () => {
        const schema = b.or({}, b.string(), b.number());

        const validateString = schema.validate("hello world");

        expect(validateString.valid).toBe(true);
        expect(validateString.errors).toEqual([]);

        const validateNumber = schema.validate(2);

        expect(validateNumber.valid).toBe(true);
        expect(validateNumber.errors).toEqual([]);

        const validateBoolean = schema.validate(true);

        expect(validateBoolean.valid).toBe(false);
        expect(validateBoolean.errors).toEqual(["Or does not match schema"]);

        const validateObject = schema.validate({ foo: "bar" });

        expect(validateObject.valid).toBe(false);
        expect(validateObject.errors).toEqual(["Or does not match schema"]);
    });
    test("and", () => {
        const schema = b.and({}, b.any(), b.boolean());

        const validateTrue = schema.validate(true);

        expect(validateTrue.valid).toBe(true);
        expect(validateTrue.errors).toEqual([]);

        const validateNumber = schema.validate(2);

        expect(validateNumber.valid).toBe(false);
        expect(validateNumber.errors).toEqual(["And does not match schema"]);

        const validateString = schema.validate("hello world");

        expect(validateString.valid).toBe(false);
        expect(validateString.errors).toEqual(["And does not match schema"]);

        const validateObject = schema.validate({ foo: "bar" });

        expect(validateObject.valid).toBe(false);
        expect(validateObject.errors).toEqual(["And does not match schema"]);
    });
});
