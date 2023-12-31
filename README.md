# Lightweight Schema Validator

Balid is a light weight schema validator.

> :warning: **Not Production ready**

## Todos

-   [x] **Basic Types**
    -   [x] any
    -   [x] boolean
    -   [x] number
    -   [x] string
-   [ ] **Advanced Types**
    -   [x] Objects
    -   [ ] Arrays
-   [ ] **Utility Functions (e.g: max, min)**
    -   [ ] min
    -   [ ] max

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

### Any

```typescript
import { b } from "balid";

const schema = b.any();

schema.validate(200); // returns true
schema.validate({ foo: "bar" }); // returns true
```

### Boolean:

```typescript
import { b } from "balid";

const schema = b.boolean();

schema.validate(false); // returns true
schema.validate("false"); // returns false
```

### String:

```typescript
import { b } from "balid";

const schema = b.string();

schema.validate("Hello World"); // returns true
```

### Number:

```typescript
import { b } from "balid";

const schema = b.number();

schema.validate(123); // returns true
schema.validate("123"); // returns false
```

### Object:

```typescript
import { b } from "balid";

const schema = b.object({
	name: b.string(),
});

schema.validate({ name: "John Doe" }); // returns true
```
