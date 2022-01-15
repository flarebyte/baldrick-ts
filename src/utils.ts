import { isEqual } from './barrel.js';
import { Author, FieldStatus, SupportedPackageJsonFieldType } from './model.js';

const fixme = 'fixme';

function oneOfThree<T>(
  condition1: boolean,
  condition2: boolean,
  option1: T,
  option2: T,
  defaultValue: T
): T {
  if (condition1) {
    return option1;
  } else if (condition2) {
    return option2;
  } else {
    return defaultValue;
  }
}

export const trimString = (value: string | null | undefined): string =>
  value === null || value === undefined ? fixme : value.trim();

export const trimStringArray = (
  values: string[] | null | undefined
): string[] =>
  values === null || values === undefined ? [] : values.map(trimString);

export const toStringLength = (value: string | unknown): number =>
  typeof value === 'string' ? value.length : 0;

export const toCountItems = (
  value: string | string[] | object | null | undefined
): number => {
  if (value === null || value === undefined) {
    return 0;
  } else if (typeof value === 'string') {
    return 1;
  } else if (Array.isArray(value)) {
    return value.length;
  } else if (typeof value === 'object') {
    return Object.keys(value).length;
  } else {
    throw new TypeError('What other type could it be ?');
  }
};

export const editableToStatus = (
  value: SupportedPackageJsonFieldType,
  fixed: SupportedPackageJsonFieldType
): FieldStatus =>
  oneOfThree(
    typeof value === 'string' && value.length < 3,
    value === fixed,
    'todo',
    'ok',
    'fixable'
  );

export const autoToStatus = (
  value: SupportedPackageJsonFieldType,
  fixed: SupportedPackageJsonFieldType
): FieldStatus => (isEqual(value, fixed) ? 'ok' : 'fixable');

export const editableArrToStatus = (
  value: SupportedPackageJsonFieldType,
  fixed: SupportedPackageJsonFieldType
): FieldStatus =>
  oneOfThree(
    Array.isArray(value) && value.length === 0,
    isEqual(value, fixed),
    'todo',
    'ok',
    'fixable'
  );

function isAuthor(value: SupportedPackageJsonFieldType): value is Author {
  return (value as Author).name !== undefined;
}
export const authorToStatus = (
  value: SupportedPackageJsonFieldType
): FieldStatus =>
  oneOfThree(
    typeof value === 'string',
    isAuthor(value) &&
      ((value as Author).name.includes(fixme) ||
        (value as Author).url.includes(fixme)),
    'todo',
    'todo',
    'ok'
  );

export const statusToTodo = (status: FieldStatus): string =>
  oneOfThree(status === 'ok', status === 'todo', 'OK', '❌ TODO', '🤖 FIX');

export const stringBetween =
  (from: string, to: string) =>
  (line: string): string => {
    const start = line.indexOf(from);
    const end = line.indexOf(to);
    return start === -1 || end === -1
      ? ''
      : line.slice(start + from.length, end + 1 - to.length);
  };

export const alwaysObj = (value: null | undefined | object): object =>
  value === null || value === undefined ? {} : value;

export const findHeader = (prefix: string) => (lines: string[]) =>
  (lines.find((line) => line.startsWith(prefix)) || prefix).slice(
    prefix.length
  );

export const findQuote = (lines: string[]): string => {
  const quoteParts = lines
    .filter((line) => line.startsWith('>'))
    .map((line) => line.slice(1).trim());
  return quoteParts.join(' ');
};
