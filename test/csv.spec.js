"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const src_1 = __importDefault(require("../src/"));
const schema_1 = require("../src/schema");
(0, vitest_1.describe)("Main CSV parsing tests", () => {
    (0, vitest_1.test)("should parse a CSV string row", () => __awaiter(void 0, void 0, void 0, function* () {
        const row = src_1.default.parseRow("1,2,3");
        (0, vitest_1.expect)(row).toEqual(["1", "2", "3"]);
    }));
    (0, vitest_1.test)("should parse a CSV row with schema", () => __awaiter(void 0, void 0, void 0, function* () {
        const row = src_1.default.parseRow("1,2,3", {
            schema: [schema_1.Number, schema_1.Number, schema_1.Number],
        });
        (0, vitest_1.expect)(row).toEqual([1, 2, 3]);
    }));
    (0, vitest_1.test)("should parse a CSV string table", () => __awaiter(void 0, void 0, void 0, function* () {
        const csv = src_1.default.parseTable("a,b,c\n1,2,3\n4,5,6");
        (0, vitest_1.expect)(csv).toEqual([
            ["a", "b", "c"],
            ["1", "2", "3"],
            ["4", "5", "6"],
        ]);
    }));
    (0, vitest_1.test)("should parse a CSV buffer", () => __awaiter(void 0, void 0, void 0, function* () {
        const csv = src_1.default.parseTable(Buffer.from("a,b,c\n1,2,3\n4,5,6"));
        (0, vitest_1.expect)(csv).toEqual([
            ["a", "b", "c"],
            ["1", "2", "3"],
            ["4", "5", "6"],
        ]);
    }));
    (0, vitest_1.test)("should parse a CSV string with schema", () => __awaiter(void 0, void 0, void 0, function* () {
        const csv = src_1.default.parseTable("1,2,3\n4,5,6", {
            schema: [schema_1.Number, schema_1.Number, schema_1.Number],
        });
        (0, vitest_1.expect)(csv).toEqual([
            [1, 2, 3],
            [4, 5, 6],
        ]);
    }));
    (0, vitest_1.test)("should parse a CSV buffer with schema", () => __awaiter(void 0, void 0, void 0, function* () {
        const csv = src_1.default.parseTable(Buffer.from("1,Hello,true\n4,Anna,false"), {
            schema: [schema_1.Number, schema_1.String, schema_1.Boolean],
        });
        (0, vitest_1.expect)(csv).toEqual([
            [1, "Hello", true],
            [4, "Anna", false],
        ]);
    }));
    (0, vitest_1.test)("should parse a CSV string with schema and invalid values", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, vitest_1.expect)(() => src_1.default.parseTable("1,2,3\n4,5,6", {
            schema: [schema_1.Number, schema_1.Number],
        })).toThrow("Invalid schema length");
    }));
    (0, vitest_1.test)("should parse a CSV buffer with schema and invalid values", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, vitest_1.expect)(() => src_1.default.parseTable(Buffer.from("1,2,3\n4,5,6"), {
            schema: [schema_1.Number, schema_1.Number],
        })).toThrow("Invalid schema length");
    }));
    (0, vitest_1.test)("should parse a CSV string with object schema", () => __awaiter(void 0, void 0, void 0, function* () {
        const obj = {
            name: "John",
            age: 20,
            isStudent: true,
        };
        const csv = `'${JSON.stringify(obj)}'\n'${JSON.stringify(obj)}'`;
        const parsed = src_1.default.parseTable(csv, {
            schema: [(schema_1.Obj)],
            quote: "'",
        });
        (0, vitest_1.expect)(parsed).toEqual([[obj], [obj]]);
    }));
    (0, vitest_1.test)("should parse a CSV with custom schema", () => __awaiter(void 0, void 0, void 0, function* () {
        class CustomAtSchema {
            parse(value) {
                if (!this.validate(value)) {
                    throw new Error("Invalid value");
                }
                return value.replace("@", "");
            }
            validate(value) {
                return value.startsWith("@");
            }
        }
        const csv = src_1.default.parseTable("@1,2,3\n@4,5,6", {
            schema: [CustomAtSchema, schema_1.Number, schema_1.Number],
        });
        (0, vitest_1.expect)(csv).toEqual([
            ["1", 2, 3],
            ["4", 5, 6],
        ]);
    }));
});
