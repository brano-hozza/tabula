import { expect, test, describe } from "vitest";
import tabula from "../src/";
import { Boolean, Number, Obj, SchemaType, String } from "../src/schema";

describe("Main CSV parsing tests", () => {
  test("should parse a CSV string row", async () => {
    const row = tabula.parseRow("1,2,3");
    expect(row).toEqual(["1", "2", "3"]);
  });

  test("should parse a CSV row with schema", async () => {
    const row = tabula.parseRow("1,2,3", {
      schema: [Number, Number, Number] as const,
    });
    expect(row).toEqual([1, 2, 3]);
  });

  test("should parse a CSV string table", async () => {
    const csv = tabula.parseTable("a,b,c\n1,2,3\n4,5,6");
    expect(csv).toEqual([
      ["a", "b", "c"],
      ["1", "2", "3"],
      ["4", "5", "6"],
    ]);
  });

  test("should parse a CSV buffer", async () => {
    const csv = tabula.parseTable(Buffer.from("a,b,c\n1,2,3\n4,5,6"));

    expect(csv).toEqual([
      ["a", "b", "c"],
      ["1", "2", "3"],
      ["4", "5", "6"],
    ]);
  });

  test("should parse a CSV string with schema", async () => {
    const csv = tabula.parseTable("1,2,3\n4,5,6", {
      schema: [Number, Number, Number] as const,
    });
    expect(csv).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  test("should parse a CSV buffer with schema", async () => {
    const csv = tabula.parseTable(Buffer.from("1,Hello,true\n4,Anna,false"), {
      schema: [Number, String, Boolean] as const,
    });
    expect(csv).toEqual([
      [1, "Hello", true],
      [4, "Anna", false],
    ]);
  });

  test("should parse a CSV string with schema and invalid values", async () => {
    expect(() =>
      tabula.parseTable("1,2,3\n4,5,6", {
        schema: [Number, Number] as const,
      })
    ).toThrow("Invalid schema length");
  });

  test("should parse a CSV buffer with schema and invalid values", async () => {
    expect(() =>
      tabula.parseTable(Buffer.from("1,2,3\n4,5,6"), {
        schema: [Number, Number] as const,
      })
    ).toThrow("Invalid schema length");
  });

  test("should parse a CSV string with object schema", async () => {
    const obj = {
      name: "John",
      age: 20,
      isStudent: true,
    };
    const csv = `'${JSON.stringify(obj)}'\n'${JSON.stringify(obj)}'`;
    const parsed = tabula.parseTable(csv, {
      schema: [Obj<typeof obj>] as const,
      quote: "'",
    });
    expect(parsed).toEqual([[obj], [obj]]);
  });

  test("should parse a CSV with custom schema", async () => {
    class CustomAtSchema implements SchemaType {
      parse(value: string): string {
        if (!value.startsWith("@")) {
          throw new Error("Invalid value");
        }
        return value.replace("@", "");
      }
    }

    const csv = tabula.parseTable("@1,2,3\n@4,5,6", {
      schema: [CustomAtSchema, Number, Number] as const,
    });

    expect(csv).toEqual([
      ["1", 2, 3],
      ["4", 5, 6],
    ]);
  });

  test("should parse a CSV and skip headers", async () => {
    const csv = tabula.parseTable("a,b,c\n1,2,3\n4,5,6", {
      header: true,
    });
    expect(csv).toEqual([
      ["1", "2", "3"],
      ["4", "5", "6"],
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
