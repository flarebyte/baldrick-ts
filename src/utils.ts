import { isEqual } from './barrel.js';
import { Author, FieldStatus, SupportedPackageJsonFieldType } from './model.js';

const fixme = 'fixme';

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
): number =>
  value === null || value === undefined
    ? 0
    : typeof value === 'string'
    ? 1
    : Object.keys(value).length;
export const editableToStatus = (
  value: SupportedPackageJsonFieldType,
  fixed: SupportedPackageJsonFieldType
): FieldStatus =>
  typeof value === 'string' && value.length < 3
    ? 'todo'
    : value === fixed
    ? 'ok'
    : 'fixable';

export const autoToStatus = (
  value: SupportedPackageJsonFieldType,
  fixed: SupportedPackageJsonFieldType
): FieldStatus => (isEqual(value, fixed) ? 'ok' : 'fixable');

export const editableArrToStatus = (
  value: SupportedPackageJsonFieldType,
  fixed: SupportedPackageJsonFieldType
): FieldStatus =>
  Array.isArray(value) && value.length === 0
    ? 'todo'
    : isEqual(value, fixed)
    ? 'ok'
    : 'fixable';

function isAuthor(value: SupportedPackageJsonFieldType): value is Author {
  return (value as Author).name !== undefined;
}
export const authorToStatus = (
  value: SupportedPackageJsonFieldType
): FieldStatus =>
  typeof value === 'string'
    ? 'todo'
    : isAuthor(value) &&
      ((value as Author).name.includes(fixme) ||
        (value as Author).url.includes(fixme))
    ? 'todo'
    : 'ok';

export const statusToTodo = (status: FieldStatus): string =>
  status === 'ok' ? 'OK' : status === 'todo' ? '❌ TODO' : '🤖 FIX';

export const stringBetween =
  (from: string, to: string) =>
  (line: string): string => {
    const start = line.indexOf(from);
    const end = line.indexOf(to);
    return start === -1 || end === -1
      ? ''
      : line.substring(start + from.length, end + 1 - to.length);
  };

export const alwaysObj = (value: null | undefined | object): object =>
  value === null || value === undefined ? {} : value;

export const findHeader = (prefix: string) => (lines: string[]) =>
  (lines.find((line) => line.startsWith(prefix)) || prefix).substring(
    prefix.length
  );
