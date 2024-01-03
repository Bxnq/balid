import { b } from "../src/index";

describe("basic", () => {
	test("any", () => {
		const schema = b.any();

		expect(schema.validate(2).valid).toBe(true);
		expect(schema.validate("test").valid).toBe(true);
		expect(schema.validate({ foo: "bar" }).valid).toBe(true);
		expect(schema.validate(true).valid).toBe(true);
	});

	test("boolean", () => {
		const schema = b.boolean();

		expect(schema.validate(2).valid).toBe(false);
		expect(schema.validate("hello world").valid).toBe(false);
		expect(schema.validate({ foo: "bar" }).valid).toBe(false);
		expect(schema.validate(true).valid).toBe(true);
		expect(schema.validate(false).valid).toBe(true);
	});

	test("string", () => {
		const schema = b.string();

		expect(schema.validate("test").valid).toBe(true);

		expect(schema.validate(true).valid).toBe(false);
		expect(schema.validate(2).valid).toBe(false);
		expect(schema.validate({ test: "string" }).valid).toBe(false);
	});

	test("number", () => {
		const schema = b.number();

		expect(schema.validate(2).valid).toBe(true);
		expect(schema.validate("2").valid).toBe(false);

		expect(schema.validate(true).valid).toBe(false);
		expect(schema.validate("hello world").valid).toBe(false);
		expect(schema.validate({ foo: "bar" }).valid).toBe(false);
	});
});

describe("advanced", () => {
	test("object", () => {
		const schema = b.object({
			name: b.string(),
			age: b.number(),
		});

		expect(schema.validate(2).valid).toBe(false);
		expect(schema.validate(true).valid).toBe(false);
		expect(schema.validate("hello world").valid).toBe(false);

		expect(schema.validate({ name: "test", age: 2 }).valid).toBe(true);
		expect(schema.validate({ name: 2, age: "hello world" }).valid).toBe(false);
	});
});
