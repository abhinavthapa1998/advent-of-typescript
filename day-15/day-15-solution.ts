type BoxIt<
  T,
  N extends number,
  Box extends any[] = []
> = Box["length"] extends N ? Box : BoxIt<T, N, [...Box, T]>;

type BoxToys<T, N extends number> = N extends N ? BoxIt<T, N> : never;
