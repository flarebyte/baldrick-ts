import { TermFormatterParams } from '../src/model';
import { basicFormatter } from '../src/term-formatter';
jest.spyOn(global.console, 'info')
jest.spyOn(global.console, 'error')

describe('term-formatter', () => {
  it('should provide', () => {
    const opts:TermFormatterParams = {
        title: 'some title',
        detail: 'some detail',
        kind: 'intro',
        format: 'default'
    };
    basicFormatter(opts);
    expect(console.info).toBeCalled();
  });
});
