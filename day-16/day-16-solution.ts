// Convert String To Number
type StringToNumber<T> = T extends `${infer N extends number}` ? N : never;

type FindSanta<Arr extends unknown[][]> = {
  [Row in keyof Arr]: {
    [Column in keyof Arr[Row]]: Arr[Row][Column] extends "🎅🏼"
      ? [StringToNumber<Row>, StringToNumber<Column>]
      : never;
  }[keyof Arr[Row]];
}[number];

type Forest0 = [
  ["🎅🏼", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄"],
  ["🎄", "🎄", "🎄", "🎄"]
];
type test_0_actual = FindSanta<Forest0>;
//   ^?
