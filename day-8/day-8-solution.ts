type RemoveNaughtyChildren<T> = {
  [property in keyof T as Exclude<property, `naughty_${string}`>]: T[property];
};
