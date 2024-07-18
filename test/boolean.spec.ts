import { describe, expect, test } from "vitest";
import tabula from "../src";
import { BooleanSchema, NumberSchema } from "../src/schema";

describe("Boolean in CSV", () => {
  test("should parse a simple row", async () => {
    const row = tabula.parseRow("true,true,true", {
      schema: [BooleanSchema, BooleanSchema, BooleanSchema] as const,
    });
    expect(row).toEqual([true, true, true]);
  });

  test("should parse a table with schema", async () => {
    const row = tabula.parseTable("true,true,true\ntrue,true,true", {
      schema: [BooleanSchema, BooleanSchema, BooleanSchema] as const,
    });
    expect(row).toEqual([
      [true, true, true],
      [true, true, true],
    ]);
  });
});
