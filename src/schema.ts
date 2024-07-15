export interface SchemaType<T = unknown> {
  parse(value: string): T;
  validate(value: string): boolean;
}

export type Schema = {
  new (): SchemaType;
};

export type InferSchemaType<T extends Schema[]> = {
  [K in keyof T]: InstanceType<T[K]> extends SchemaType<infer U> ? U : never;
};

export class Number implements SchemaType<number> {
  parse(value: string): number {
    return parseFloat(value);
  }

  validate(value: string): boolean {
    return !isNaN(parseFloat(value));
  }
}

export class String implements SchemaType<string> {
  parse(value: string): string {
    return value;
  }

  validate(value: string): boolean {
    return true;
  }
}

export class Boolean implements SchemaType<boolean> {
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

  validate(value: string): boolean {
    return value === "true" || value === "false";
  }
}

export class Obj<T extends object> implements SchemaType<T> {
  parse(value: string): T {
    const obj = JSON.parse(value);
    if (typeof obj !== "object") {
      throw new Error("Invalid object value");
    }
    return obj;
  }

  validate(value: string): boolean {
    try {
      const val = JSON.parse(value);
      return typeof val === "object";
    } catch (e) {
      return false;
    }
  }
}

export class Arr<T> implements SchemaType<T[]> {
  parse(value: string): T[] {
    const arr = JSON.parse(value);
    if (!Array.isArray(arr)) {
      throw new Error("Invalid array value");
    }
    return arr;
  }

  validate(value: string): boolean {
    try {
      const arr = JSON.parse(value);
      return Array.isArray(arr);
    } catch (e) {
      return false;
    }
  }
}
