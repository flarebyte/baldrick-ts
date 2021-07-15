import { isEqual } from './barrel';
import { FieldStatus } from './model';

const fixme = 'fixme';

const trimString = (value: string | null | undefined): string =>
  value === null || value === undefined ? fixme : value.trim();

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

const editableToStatus = (value: string, fixed: string): FieldStatus =>
  value.length < 3
    ? FieldStatus.Todo
    : value === fixed
    ? FieldStatus.Ok
    : FieldStatus.Fixable;

const autoToStatus = (value: any, fixed: any): FieldStatus =>
  isEqual(value, fixed) ? FieldStatus.Ok : FieldStatus.Fixable;

const editableArrToStatus = (value: string[], fixed: string[]): FieldStatus =>
  value.length === 0
    ? FieldStatus.Todo
    : isEqual(value, fixed)
    ? FieldStatus.Ok
    : FieldStatus.Fixable;

const statusToTodo = (status: FieldStatus): string =>
  status === FieldStatus.Ok
    ? 'OK'
    : status === FieldStatus.Todo
    ? '❌ TODO'
    : '🤖 FIX';

export {
  trimString,
  trimStringArray,
  toStringLength,
  toCountItems,
  editableToStatus,
  autoToStatus,
  editableArrToStatus,
  statusToTodo,
};
