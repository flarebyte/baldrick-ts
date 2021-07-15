import { FieldStatus } from '../src/model';
import {
  autoToStatus,
  editableArrToStatus,
  editableToStatus,
  statusToTodo,
  toCountItems,
  trimString,
  trimStringArray,
} from '../src/utils';
describe('Utility', () => {
  it('Trim a string', () => {
    expect(trimString(' center ')).toEqual('center');
    expect(trimString('')).toEqual('');
    expect(trimString(null)).toEqual('fixme');
    expect(trimString(undefined)).toEqual('fixme');
  });
  it('Trim a string array', () => {
    expect(trimStringArray([' center '])).toEqual(['center']);
    expect(trimStringArray([])).toEqual([]);
    expect(trimStringArray(null)).toEqual([]);
    expect(trimStringArray(undefined)).toEqual([]);
  });
  it('Count the number of items', () => {
    expect(toCountItems(null)).toEqual(0)
    expect(toCountItems(undefined)).toEqual(0)
    expect(toCountItems('abc')).toEqual(1);
    expect(toCountItems('')).toEqual(1);
    expect(toCountItems([])).toEqual(0);
    expect(toCountItems(['a', 'b'])).toEqual(2);
    expect(toCountItems({ a: 'alpha', b: 'beta'})).toEqual(2);

  });
  it('Convert an editable field value to status', () => {
    expect(editableToStatus('long text', 'long text')).toEqual(FieldStatus.Ok);
    expect(editableToStatus('a', 'a')).toEqual(FieldStatus.Todo); //too short
    expect(editableToStatus('existing', 'better')).toEqual(FieldStatus.Fixable);
  });
  it('Convert an automatic field value to status', () => {
    expect(autoToStatus('same', 'same')).toEqual(FieldStatus.Ok);
    expect(autoToStatus('original', 'fixed')).toEqual(FieldStatus.Fixable);
  });
  it('Convert an editable array field field value to status', () => {
    expect(editableArrToStatus(['same'], ['same'])).toEqual(FieldStatus.Ok);
    expect(editableArrToStatus([], [])).toEqual(FieldStatus.Todo);
    expect(editableArrToStatus(['original'], ['fixed'])).toEqual(
      FieldStatus.Fixable
    );
  });
  it('Convert a status to a todo string', () => {
    expect(statusToTodo(FieldStatus.Ok)).toContain('OK');
    expect(statusToTodo(FieldStatus.Todo)).toContain('TODO');
    expect(statusToTodo(FieldStatus.Fixable)).toContain('FIX');
  });
});
