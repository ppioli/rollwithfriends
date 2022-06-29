export function mergeValue<T>(existingValue: T | null, value: T) {
  return existingValue === value ? value : null;
}
