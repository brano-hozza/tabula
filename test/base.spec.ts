import { expect, test, describe } from "vitest";
import { tabula } from "../src/";

describe("Main CSV parsing tests", () => {
  test("should parse a CSV", async () => {
    const csv = tabula.parseTable("1,2,3\n4,5,6");
    expect(csv).toEqual([
      ["1", "2", "3"],
      ["4", "5", "6"],
    ]);
  });

  test("should parse a CSV with custom delimiters", async () => {
    const csv = tabula.parseTable("1;2;3~4;5;6", {
      newline: "~",
      separator: ";",
    });
    expect(csv).toEqual([
      ["1", "2", "3"],
      ["4", "5", "6"],
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
});
