import {
  alwaysArray,
  alwaysObj,
  autoToStatus,
  editableArrToStatus,
  editableToStatus,
  findHeader,
  statusToTodo,
  stringBetween,
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
    expect(toCountItems(null)).toEqual(0);
    expect(toCountItems(undefined)).toEqual(0);
    expect(toCountItems('abc')).toEqual(1);
    expect(toCountItems('')).toEqual(1);
    expect(toCountItems([])).toEqual(0);
    expect(toCountItems(['a', 'b'])).toEqual(2);
    expect(toCountItems({ a: 'alpha', b: 'beta' })).toEqual(2);
  });
  it('Convert an editable field value to status', () => {
    expect(editableToStatus('long text', 'long text')).toEqual('ok');
    expect(editableToStatus('a', 'a')).toEqual('todo'); //too short
    expect(editableToStatus('existing', 'better')).toEqual('fixable');
  });
  it('Convert an automatic field value to status', () => {
    expect(autoToStatus('same', 'same')).toEqual('ok');
    expect(autoToStatus('original', 'fixed')).toEqual('fixable');
  });
  it('Convert an editable array field field value to status', () => {
    expect(editableArrToStatus(['same'], ['same'])).toEqual('ok');
    expect(editableArrToStatus([], [])).toEqual('todo');
    expect(editableArrToStatus(['original'], ['fixed'])).toEqual(
      'fixable'
    );
  });
  it('Convert a status to a todo string', () => {
    expect(statusToTodo('ok')).toContain('OK');
    expect(statusToTodo('todo')).toContain('TODO');
    expect(statusToTodo('fixable')).toContain('FIX');
  });

  it('Extract string in between', () => {
    expect(stringBetween('![', ']')('')).toEqual('');
    expect(
      stringBetween(
        '![',
        ']'
      )('![npm](https://img.shields.io/npm/v/scratchbook)')
    ).toEqual('npm');
    expect(
      stringBetween(
        '(',
        ')'
      )('![npm](https://img.shields.io/npm/v/scratchbook)')
    ).toEqual('https://img.shields.io/npm/v/scratchbook');
    expect(
      stringBetween('(', ')')('![npm]https://img.shields.io/npm/v/scratchbook)')
    ).toEqual('');
    expect(
      stringBetween('(', ')')('![npm](https://img.shields.io/npm/v/scratchbook')
    ).toEqual('');
  });

  it('Default an object to empty object', () => {
    const obj1 = {
      a: 'something',
    };
    expect(alwaysObj(obj1)).toEqual(obj1);
    expect(alwaysObj(null)).toEqual({});
    expect(alwaysObj(undefined)).toEqual({});
  });
  it('Default an array to empty array', () => {
    const array1 = ['hello'];
    expect(alwaysArray(array1)).toEqual(array1);
    expect(alwaysArray(null)).toEqual([]);
    expect(alwaysArray(undefined)).toEqual([]);
  });
  it('Find headers', () => {
    expect(
      findHeader('## ')(['not header', '## header', 'after-header'])
    ).toEqual('header');
    expect(
      findHeader('## ')(['not header', 'still-no-header', 'after-header'])
    ).toEqual('');
  });
});
