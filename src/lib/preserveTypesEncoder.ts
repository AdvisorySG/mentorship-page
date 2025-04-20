// THIS FILE IS FROM https://github.com/elastic/search-ui/blob/6f99ec8c1dc8e62b0f68f7ffc01bca57ce2ea3fa/packages/search-ui/src/preserveTypesEncoder.ts

// @ts-ignore
function isTypeNumber(value): boolean {
  return value !== undefined && value !== null && typeof value === "number";
}

// @ts-ignore
function isTypeBoolean(value): boolean {
  return value && typeof value === "boolean";
}

// @ts-ignore
function toBoolean(value): boolean {
  if (value === "true") return true;
  if (value === "false") return false;
  throw "Invalid type parsed as Boolean value";
}

/* Encoder for qs library which preserve number types on the URL. Numbers
  are padded with "n_{number}_n", and booleans with "b_{boolean}_b"*/

export default {
  // @ts-ignore
  encode(value, encode): string {
    if (isTypeNumber(value)) {
      return `n_${value}_n`;
    }
    if (isTypeBoolean(value)) {
      return `b_${value}_b`;
    }
    return encode(value);
  },
  // @ts-ignore
  decode(value, decode) {
    //eslint-disable-next-line
    if (/n_-?[\d\.]*_n/.test(value)) {
      const numericValueString = value.substring(2, value.length - 2);
      return Number(numericValueString);
    }
    if (/^b_(true|false)*_b$/.test(value)) {
      const booleanValueString = value.substring(2, value.length - 2);
      return toBoolean(booleanValueString);
    }
    return decode(value);
  },
};
