import { expect, test, describe } from "vitest";
import tabula from "../src/";
import { NumberSchema, SchemaType } from "../src/schema";

describe("Main CSV parsing tests", () => {
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
      schema: [CustomAtSchema, NumberSchema, NumberSchema] as const,
    });

    expect(csv).toEqual([
      ["1", 2, 3],
      ["4", 5, 6],
    ]);
  });
});
