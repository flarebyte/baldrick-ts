const _ = '`';

export const pullRequestMd = `
# Summary of the change 

Fixes: # (issue)

## Code check

- [ ] ${_}yarn ready${_} does not show any concerning issues
- [ ] the project can be built
- [ ] the documentation has been updated
- [ ] the version has been updated in ${_}package.json${_}

## Type of change

- [ ] Bug fix (non-breaking change which fixes an issue)

- [ ] New feature (non-breaking change which adds functionality)

- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)

## Motivation and context

- [ ] improve user experience
- [ ] improve consistency
- [ ] improve security
- [ ] improve documentation
- [ ] reduce risk for unfamiliar tasks
- [ ] automate repetitive tasks

## How Has This Been Tested

- [ ] Unit tests
- [ ] Manual tests
`;
