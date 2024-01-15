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

		const minSchema = b.string({ min: 5 });

		expect(minSchema.validate("hello world").valid).toBe(true);
		expect(minSchema.validate("abc").valid).toBe(false);

		const maxSchema = b.string({ max: 5 });

		expect(maxSchema.validate("hello world").valid).toBe(false);
		expect(maxSchema.validate("test").valid).toBe(true);

		const matchSchema = b.string({ match: /hello/ });

		expect(matchSchema.validate("hello").valid).toBe(true);
		expect(matchSchema.validate("world").valid).toBe(false);
	});

	test("number", () => {
		const schema = b.number();

		expect(schema.validate(2).valid).toBe(true);
		expect(schema.validate("2").valid).toBe(false);

		expect(schema.validate(true).valid).toBe(false);
		expect(schema.validate("hello world").valid).toBe(false);
		expect(schema.validate({ foo: "bar" }).valid).toBe(false);

		const minSchema = b.number({ min: 5 });

		expect(minSchema.validate(2).valid).toBe(false);
		expect(minSchema.validate(8).valid).toBe(true);

		const maxSchema = b.number({ max: 5 });

		expect(maxSchema.validate(2).valid).toBe(true);
		expect(maxSchema.validate(8).valid).toBe(false);
	});
});

describe("advanced", () => {
	test("object", () => {
		const schema = b.object({
			name: b.string(),
			age: b.optional(b.number()),
		});

		expect(schema.validate(2).valid).toBe(false);
		expect(schema.validate(true).valid).toBe(false);
		expect(schema.validate("hello world").valid).toBe(false);

		expect(schema.validate({ name: "test", age: 2 }).valid).toBe(true);
		expect(schema.validate({ name: "hello world" }).valid).toBe(true);
		expect(schema.validate({ age: 2 }).valid).toBe(false);
		expect(schema.validate({ name: 2, age: "hello world" }).valid).toBe(false);
	});
	test("array", () => {
		const schema = b.array(b.string());

		expect(schema.validate(2).valid).toBe(false);
		expect(schema.validate(true).valid).toBe(false);
		expect(schema.validate("hello world").valid).toBe(false);

		expect(schema.validate([2]).valid).toBe(false);
		expect(schema.validate(["test", 2]).valid).toBe(false);
		expect(schema.validate([2, "hello world"]).valid).toBe(false);
		expect(schema.validate(["test", "2"]).valid).toBe(true);
		expect(schema.validate(["hello world"]).valid).toBe(true);
	});
});

describe("util", () => {
	test("optional", () => {
		const schema = b.optional(b.string());

		expect(schema.validate("test").valid).toBe(true);
		expect(schema.validate().valid).toBe(true);
	});
	test("or", () => {
		const schema = b.or(b.string(), b.number());

		expect(schema.validate("test").valid).toBe(true);
		expect(schema.validate(2).valid).toBe(true);

		expect(schema.validate(true).valid).toBe(false);
		expect(schema.validate({ foo: "bar" }).valid).toBe(false);
	});
	test("and", () => {
		const schema = b.and(b.any(), b.boolean());

		expect(schema.validate(true).valid).toBe(true);

		expect(schema.validate(2).valid).toBe(false);
		expect(schema.validate("test").valid).toBe(false);
		expect(schema.validate({ foo: "bar" }).valid).toBe(false);
	});
});
