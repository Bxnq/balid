# Lightweight Schema Validator

Balid is a light weight schema validator.

> :warning: **Not Production ready**

## Todos

-   [x] **Basic Types**
    -   [x] any
    -   [x] boolean
    -   [x] number
    -   [x] string
-   [x] **Advanced Types**
    -   [x] Objects
    -   [x] Arrays
-   [ ] ** Advanced Errors **
    -   [ ] Error Messages
    -   [ ] Custom Error Messages
-   [x] **Utility Functions (e.g: max, min)**

    -   [x] min
    -   [x] max

-   [ ] Github Actions
    -   [ ] publish version when `main` branch changes
    -   [ ] automated tests

## Installation

```bash
pnpm add balid

# or

npm install balid

# or

yarn install balid
```

## Examples

-   [Any](#any)
-   [Boolean](#boolean)
-   [String](#string)
-   [Number](#number)
-   [Object](#object)
-   [Array](#array)
-   [And](#and)
-   [Or](#or)
-   [Optional](#optional)

### Any

```typescript
import { b } from "balid";

const schema = b.any();

schema.validate(200); // returns { valid: true }
schema.validate({ foo: "bar" }); // returns { valid: true }
```

### Boolean:

```typescript
import { b } from "balid";

const schema = b.boolean();

schema.validate(false); // returns { valid: true }
schema.validate("false"); // returns { valid: false }
```

### String:

```typescript
import { b } from "balid";

const schema = b.string();

schema.validate("Hello World"); // returns { valid: true }

const minMaxSchema = b.string({ min: 2, max: 10 });

schema.validate("a"); // returns { valid: false }
schema.validate("hello"); // returns { valid: true }

const matchSchema = b.string({ match: /hello/ });

matchSchema.validate("hello"); // returns { valid: true }
matchSchema.validate("world"); // returns { valid: false }
```

### Number:

```typescript
import { b } from "balid";

const schema = b.number();

schema.validate(123); // returns { valid: true }
schema.validate("123"); // returns { valid: false }

const minMaxSchema = b.number({ min: 10, max: 20 });

schema.validate(1); // returns { valid: false }
schema.validate(25); // returns { valid: false }
schema.validate(15); // returns { valid: true }
```

### Object:

```typescript
import { b } from "balid";

const schema = b.object({
	name: b.string(),
});

schema.validate({ name: "John Doe" }); // returns { valid: true }
```

### Array:

```typescript
import { b } from "balid";

const schema = b.array(name: b.string());

schema.validate(["John Doe"]); // returns { valid: true }
```

### And

```typescript
import { b } from "balid";

const schema = b.and(b.any(), b.boolean());

schema.validate(true); // returns { valid: true }
```

### Or

```typescript
import { b } from "balid";

const schema = b.or(b.string(), b.boolean());

schema.validate("hello world"); // returns { valid: true }
schema.validate(true); // returns { valid: true }
```

### Optional

```typescript
import { b } from "balid";

const schema = b.optional(b.string());

schema.validate("hello world"); // returns { valid: true }
schema.validate(); // returns { valid: true }
```
