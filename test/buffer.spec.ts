import { expect, test, describe } from "vitest";
import tabula from "../src/";
import { BooleanSchema, NumberSchema, StringSchema } from "../src/schema";

describe("Buffer parsing tests", () => {
  test("should parse a CSV buffer", async () => {
    const csv = tabula.parseTable(Buffer.from("a,b,c\n1,2,3\n4,5,6"));

    expect(csv).toEqual([
      ["a", "b", "c"],
      ["1", "2", "3"],
      ["4", "5", "6"],
    ]);
  });

  test("should parse a CSV buffer with schema", async () => {
    const csv = tabula.parseTable(Buffer.from("1,Hello,true\n4,Anna,false"), {
      schema: [NumberSchema, StringSchema, BooleanSchema] as const,
    });
    expect(csv).toEqual([
      [1, "Hello", true],
      [4, "Anna", false],
    ]);
  });

  test("should parse a CSV and skip headers with buffer", async () => {
    const csv = tabula.parseTable(Buffer.from("a,b,c\n1,2,3\n4,5,6"), {
      header: true,
    });
    expect(csv).toEqual([
      ["1", "2", "3"],
      ["4", "5", "6"],
    ]);
  });
});
