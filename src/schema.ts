export interface SchemaType<T = unknown> {
  parse(value: string): T;
}

export type Schema = {
  new (): SchemaType;
};

export type InferSchemaType<T extends Schema[]> = {
  [K in keyof T]: InstanceType<T[K]> extends SchemaType<infer U> ? U : never;
};

export class NumberSchema implements SchemaType<number> {
  parse(value: string): number {
    return parseFloat(value);
  }
}

export class StringSchema implements SchemaType<string> {
  parse(value: string): string {
    return value;
  }
}

export class BooleanSchema implements SchemaType<boolean> {
  parse(value: string): boolean {
    switch (value) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        throw new Error("Invalid boolean value");
    }
  }
}

export class ObjectSchema<T extends object> implements SchemaType<T> {
  parse(value: string): T {
    const obj = JSON.parse(value);
    if (typeof obj !== "object") {
      throw new Error("Invalid object value");
    }
    return obj;
  }
}

export class ArraySchema<T extends unknown> implements SchemaType<T[]> {
  parse(value: string): T[] {
    const arr = JSON.parse(value);
    if (!Array.isArray(arr)) {
      throw new Error("Invalid array value");
    }
    return arr;
  }
}
