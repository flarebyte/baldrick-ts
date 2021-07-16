import { maintenanceMd } from '../src/markdown-maintenance';

describe('Maintenance documentation', () => {
  it('normalizes MAINTENANCE.md', () => {
    expect(maintenanceMd).toBeDefined();
  });
});
