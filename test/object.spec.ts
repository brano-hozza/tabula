import { describe, expect, test } from "vitest";
import tabula from "../src";
import { ArraySchema, ObjectSchema } from "../src/schema";
describe("JSON in CSV", () => {
  test("should parse a CSV string with object schema", async () => {
    const obj = {
      name: "John",
      age: 20,
      isStudent: true,
    };
    const csv = `'${JSON.stringify(obj)}'\n'${JSON.stringify(obj)}'`;
    const parsed = tabula.parseTable(csv, {
      schema: [ObjectSchema<typeof obj>] as const,
      quote: "'",
    });
    expect(parsed).toEqual([[obj], [obj]]);
  });

  test("should parse a CSV string with array schema", async () => {
    const arr = [1, 2, 3];
    const csv = `'${JSON.stringify(arr)}'\n'${JSON.stringify(arr)}'`;
    const parsed = tabula.parseTable(csv, {
      schema: [ArraySchema<number>] as const,
      quote: "'",
    });
    expect(parsed).toEqual([[arr], [arr]]);
  });
});
