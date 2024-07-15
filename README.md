# Tabula

Your lightweight CSV parser & validator

## Installation

```bash
npm install tabula
```

## Usage

### Basic usage

```typescript
import tabula from "tabula";

const csv = `
    name,age\n
    Alice,30\n
    Bob,25
`;

const parsed = tabula.parse(csv);

console.log(parsed);
// [
//  ["name", "age"],
//  ["Alice", "30"],
//  ["Bob", "25"],
// ]
```

### Validation and parsing

```typescript
import tabula from "tabula";

const csv = `
    name,age\n
    Alice,30\n
    Bob,25
`;

const parsed = tabula.parse(csv, {
  schema: [tabula.String, tabula.Number],
  header: true,
});

console.log(parsed);
// [
//  ["Alice", 30],
//  ["Bob", 25],
// ]
```

### Custom schema

```typescript
import tabula,  type {SchemaType} from "tabula";

class EmailSchema implements SchemaType<string> {
    parse(value: string): string {
        if (!value.includes("@")) {
            throw new Error("Invalid email");
        }
        return value;
    }
}

const csv = `
    name,email\n
    Alice,alice@test.com\n
    Bob,bob@test.com\n
`

const parsed = tabula.parse(csv, {
    schema: [tabula.String, EmailSchema],
    header: true,
});
```

## Configuration object

```typescript
interface Config {
  schema?: Schema;
  header?: boolean;
  separator?: string;
  quote?: string;
  newline?: string;
}
```
