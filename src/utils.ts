const fixme = 'fixme';

const trimString = (value: string | null | undefined): string =>
  value === null || value === undefined ? fixme : value?.trim();

  const trimStringArray = (values: string[] | null | undefined): string[] =>
  values === null || values === undefined ? [] : values.map(trimString);

  const toStringLength = (value: string | any): number =>
  typeof value === 'string' ? value.length : 0;

  const toCountItems = (value: string | any): number =>
  typeof value === 'string'
    ? 1
    : typeof value === 'object'
    ? Object.keys(value).length
    : value === null || value === undefined
    ? 0
    : value.length;

  export {trimString, trimStringArray, toStringLength, toCountItems }