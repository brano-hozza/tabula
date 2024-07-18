import { describe, expect, test } from "vitest";
import tabula from "../src";
import { NumberSchema } from "../src/schema";
describe("Number in CSV", () => {
  test("should parse a simple row", async () => {
    const row = tabula.parseRow("1,2,3");
    expect(row).toEqual(["1", "2", "3"]);
  });

  test("should parse a row with schema", async () => {
    const row = tabula.parseRow("1,2,3", {
      schema: [NumberSchema, NumberSchema, NumberSchema] as const,
    });
    expect(row).toEqual([1, 2, 3]);
  });

  test("should parse a table with schema", async () => {
    const row = tabula.parseTable("1,2,3\n1,2,3", {
      schema: [NumberSchema, NumberSchema, NumberSchema] as const,
    });
    expect(row).toEqual([
      [1, 2, 3],
      [1, 2, 3],
    ]);
  });
});
