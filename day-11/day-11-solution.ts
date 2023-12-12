// A simple readonly solution does not work here
type NotNested = string | boolean | number | Function; // PREVENT INFINITE RECURSION FOR `any` TYPES

type SantaListProtector<T> = {
  readonly [Key in keyof T]: T[Key] extends NotNested
    ? T[Key]
    : SantaListProtector<T[Key]>;
};
