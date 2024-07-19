import { describe, expect, test } from "vitest";
import { NumberSchema, StringSchema, tabula } from "../src";

describe("Single row in CSV", () => {
  test("should parse a CSV string row", async () => {
    const row = tabula.parseRow("1,2,3");
    expect(row).toEqual(["1", "2", "3"]);
  });

  test("should parse a CSV row with schema", async () => {
    const row = tabula.parseRow("1,2,hello", {
      schema: [NumberSchema, NumberSchema, StringSchema] as const,
    });
    expect(row).toEqual([1, 2, "hello"]);
  });
});
