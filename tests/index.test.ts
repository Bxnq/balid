import { b } from "../src/index";

describe("basic", () => {
	test("any", () => {
		const schema = b.any();

		expect(schema.validate(2)).toBe(true);
		expect(schema.validate("test")).toBe(true);
		expect(schema.validate({ foo: "bar" })).toBe(true);
		expect(schema.validate(true)).toBe(true);
	});

	test("boolean", () => {
		const schema = b.boolean();

		expect(schema.validate(2)).toBe(false);
		expect(schema.validate("hello world")).toBe(false);
		expect(schema.validate({ foo: "bar" })).toBe(false);
		expect(schema.validate(true)).toBe(true);
		expect(schema.validate(false)).toBe(true);
	});

	test("string", () => {
		const schema = b.string();

		expect(schema.validate("test")).toBe(true);

		expect(schema.validate(true)).toBe(false);
		expect(schema.validate(2)).toBe(false);
		expect(schema.validate({ test: "string" })).toBe(false);
	});

	test("number", () => {
		const schema = b.number();

		expect(schema.validate(2)).toBe(true);
		expect(schema.validate("2")).toBe(false);

		expect(schema.validate(true)).toBe(false);
		expect(schema.validate("hello world")).toBe(false);
		expect(schema.validate({ foo: "bar" })).toBe(false);
	});
});

describe("advanced", () => {
	test("object", () => {
		const schema = b.object({
			name: b.string(),
			age: b.number(),
		});

		expect(schema.validate(2)).toBe(false);
		expect(schema.validate(true)).toBe(false);
		expect(schema.validate("hello world")).toBe(false);

		expect(schema.validate({ name: "test", age: 2 })).toBe(true);
		expect(schema.validate({ name: 2, age: "hello world" })).toBe(false);
	});
});
