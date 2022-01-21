import { SupportedFeature } from './model.js';

function isFeature(value: string): value is SupportedFeature {
  return ['lib', 'cli', 'npx', 'no:lint', 'no:test'].includes(value);
}
const toFeature = (feature: string): SupportedFeature => {
  if (isFeature(feature)) {
    return feature;
  } else {
    throw new Error(`Internal feature is not supported ${feature}`);
  }
};

export const toFeatures = (features: string[]): SupportedFeature[] =>
  features.map(toFeature);
