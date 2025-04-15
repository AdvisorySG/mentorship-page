// THIS FILE IS FROM https://github.com/elastic/search-ui/blob/6f99ec8c1dc8e62b0f68f7ffc01bca57ce2ea3fa/packages/search-ui/src/queryString.ts

import queryString from "qs";
import preserveTypesEncoder from "./preserveTypesEncoder";

export default {
  parse(string: string | Record<string, string>): Record<string, unknown> {
    return queryString.parse(string, {
      ignoreQueryPrefix: true,
      decoder: preserveTypesEncoder.decode,
      arrayLimit: 1000,
    });
  },
  stringify(object: Record<string, unknown>): string {
    return queryString.stringify(object, {
      encoder: preserveTypesEncoder.encode,
    });
  },
};
