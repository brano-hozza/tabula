import { describe, expect, test } from "vitest";
import tabula from "../src";
import { NumberSchema, StringSchema } from "../src/schema";
describe("Single row in CSV", () => {
  test("should parse a CSV string row", async () => {
    const row = tabula.parseRow("1,2,3", {
      schema: [StringSchema, StringSchema, StringSchema] as const,
    });
    expect(row).toEqual(["1", "2", "3"]);
  });

  test("should parse a CSV table with schema", async () => {
    const row = tabula.parseTable("john,hello,1\njohn,hello,1", {
      schema: [StringSchema, StringSchema, StringSchema] as const,
    });
    expect(row).toEqual([
      ["john", "hello", "1"],
      ["john", "hello", "1"],
    ]);
  });
});
