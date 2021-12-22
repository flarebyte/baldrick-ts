import { ErrTermFormatterParams, TermFormatterParams } from '../src/model';
import { basicFormatter, errorFormatter } from '../src/term-formatter';
jest.spyOn(global.console, 'info').mockImplementation(() => {});
jest.spyOn(global.console, 'error').mockImplementation(() => {});

describe('term-formatter', () => {
  it('should format with basic info', () => {
    const opts: TermFormatterParams = {
      title: 'some title',
      detail: 'some detail',
      kind: 'intro',
      format: 'default',
    };
    basicFormatter(opts);
    expect(console.info).toHaveBeenCalledWith(' ★ some title ⇨', 'some detail');
  });
  it('should format for an error', () => {
    const opts: ErrTermFormatterParams = {
      title: 'some title',
      detail: 'some error',
    };
    errorFormatter(opts);
    expect(console.error).toHaveBeenCalledWith(' ★ some title ⇨', 'some error');
  });
});
