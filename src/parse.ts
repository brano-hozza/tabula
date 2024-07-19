// Read csv file from .
import { InferSchemaType, Schema } from "./schema";

export function validateRow<T extends Schema[]>(
  values: string[],
  schema?: T
): InferSchemaType<T> {
  if (schema) {
    if (values.length !== schema.length) {
      throw new Error(
        "Invalid schema length... " + values.length + " " + schema.length
      );
    }
    return values.map((value, i) =>
      new schema[i]().parse(value)
    ) as InferSchemaType<T>;
  }
  return values as InferSchemaType<T>;
}

export function splitRow(
  rowString: string,
  separator = ",",
  quote = '"'
): string[] {
  let state: "normal" | "quote" | "escape" = "normal";
  const words = [];
  let word = "";
  for (let i = 0; i < rowString.length; i++) {
    const char = rowString[i];
    if (state === "normal") {
      if (char === separator) {
        words.push(word);
        word = "";
      } else if (char === "\\") {
        state = "escape";
      } else if (char === quote) {
        state = "quote";
      } else {
        word += char;
      }
    } else if (state === "escape") {
      word += char;
      state = "normal";
    } else if (state === "quote") {
      if (char === quote) {
        state = "normal";
      } else {
        word += char;
      }
    }
  }
  if (word.length) {
    words.push(word);
  }
  return words;
}

export interface Config<T extends Schema[]> {
  newline?: string;
  separator?: string;
  quote?: string;
  schema?: T;
  header?: boolean;
}

export function parseRow<T extends Schema[] = Schema[]>(
  line: string,
  config: Config<T> = {}
): InferSchemaType<T> {
  const row = splitRow(line, config?.separator, config?.quote);
  return validateRow<T>(row, config?.schema);
}

export function parseTable<T extends Schema[] = Schema[]>(
  stream: string | Buffer,
  config: Config<T> = {}
): InferSchemaType<T>[] {
  if (typeof stream === "string") {
    const rows = stream.split(config?.newline ?? "\n");
    if (config.header) {
      rows.shift();
    }
    return rows.map((line) => parseRow(line, config));
  } else if (Buffer.isBuffer(stream)) {
    const rows = stream.toString().split(config?.newline ?? "\n");
    if (config.header) {
      rows.shift();
    }
    return rows.map((line) => parseRow(line, config));
  }
  throw new Error("Invalid input");
}

export function* parseTableGen<T extends Schema[] = Schema[]>(
  stream: string | Buffer,
  config: Config<T> = {}
): Generator<InferSchemaType<T>> {
  if (typeof stream === "string") {
    const rows = stream.split(config?.newline ?? "\n");
    if (config.header) {
      rows.shift();
    }
    for (const line of rows) {
      yield parseRow(line, config);
    }
    return;
  } else if (Buffer.isBuffer(stream)) {
    const rows = stream.toString().split(config?.newline ?? "\n");
    if (config.header) {
      rows.shift();
    }
    for (const line of rows) {
      yield parseRow(line, config);
    }
    return;
  }
  throw new Error("Invalid input");
}
