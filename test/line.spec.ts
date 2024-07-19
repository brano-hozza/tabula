import { expect, test, describe } from "vitest";
import { tabula } from "../src/";

describe("Test line parsing", () => {
  test("compare native split with custom split", async () => {
    const csv = "1,2,3,4,5,6,7,8,9,10";
    console.group("Splitting 10 values");
    console.time("native");

    const native = csv.split(",");
    console.timeEnd("native");
    console.time("custom");

    const custom = tabula.splitRow(csv);
    console.timeEnd("custom");
    console.groupEnd();
    expect(custom).toEqual(native);
  });

  test("escape delimiter in CSV row", async () => {
    const csv = '1,"2,3",4';
    const row = tabula.splitRow(csv);
    expect(row).toEqual(["1", "2,3", "4"]);
  });

  test("escape quote in CSV row", async () => {
    const csv = '1,\\"2,3\\",4';
    const row = tabula.splitRow(csv);
    expect(row).toEqual(["1", '"2', '3"', "4"]);
  });
});
