type GiftMap = {
  "🛹": "🚲";
  "🚲": "🛴";
  "🛴": "🏄";
  "🏄": "🛹";
};

type ArrGen<N, V, R extends V[] = []> = R["length"] extends N
  ? R
  : ArrGen<N, V, [...R, V]>;

type Rebuild<T extends any[], R extends any[] = []> = T extends [
  infer F,
  ...infer L
]
  ? R extends [...infer _, infer G extends keyof GiftMap]
    ? Rebuild<L, [...R, ...ArrGen<F, GiftMap[G]>]>
    : Rebuild<L, [...R, ...ArrGen<F, "🛹">]>
  : R;

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>;
//   ^?
type test_0_expected = [
  "🛹",
  "🛹",
  "🚲",
  "🛴",
  "🛴",
  "🛴",
  "🏄",
  "🏄",
  "🏄",
  "🛹",
  "🚲",
  "🛴",
  "🛴"
];
