export const stringifyArrayOfObjects = (arr: any[], prependSpace: number = 0) =>
  arr
    .map((item) => JSON.stringify(item, null, 2))
    .join(',\n')
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/^/gm, ' '.repeat(prependSpace));
