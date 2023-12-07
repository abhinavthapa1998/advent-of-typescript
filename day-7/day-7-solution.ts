//TODO: Investigate why Record<string, unknown> is not working as expected.
type AppendGood<T extends Record<string, unknown>> = {
  [key in keyof T as `good_${string & key}`]: T[key];
};
