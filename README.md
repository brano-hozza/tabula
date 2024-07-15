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

### With validation and parsing

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

## Configuration

```typescript
interface Config {
  schema?: Schema;
  header?: boolean;
  separator?: string;
  quote?: string;
  newline?: string;
}
```
