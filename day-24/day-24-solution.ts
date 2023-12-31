type Alley = "  ";
type MazeItem = "🎄" | "🎅" | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

type BuildTuple<
  L extends number,
  T extends any[] = [],
  Value = any
> = T["length"] extends L ? T : BuildTuple<L, [...T, Value], Value>;

type Increment<A extends number> = [...BuildTuple<A>, 1]["length"];
type Decrement<A extends number> = BuildTuple<A> extends [
  infer _,
  ...infer Rest
]
  ? Rest["length"]
  : never;

type FindSantaColumn<
  Input extends MazeItem[],
  Column extends number[] = []
> = Input extends [infer El, ...infer Rest extends MazeItem[]]
  ? El extends "🎅"
    ? Column["length"]
    : FindSantaColumn<Rest, [...Column, 0]>
  : never;
type FindSanta<
  Input extends MazeMatrix,
  Row extends number[] = []
> = Input extends [
  infer El extends MazeItem[],
  ...infer Rest extends MazeMatrix
]
  ? "🎅" extends El[number]
    ? [Row["length"], FindSantaColumn<El>]
    : FindSanta<Rest, [...Row, 0]>
  : never;

type RowLimit<Input extends MazeMatrix> = Input["length"];
type ColumnLimit<Input extends MazeMatrix> = Input extends [
  infer El extends MazeItem[],
  ...infer _
]
  ? El["length"]
  : never;

type Escape<Input extends MazeMatrix> = Input extends [
  infer El extends MazeItem[],
  ...infer Rest extends MazeMatrix
]
  ? [BuildTuple<El["length"], [], DELICIOUS_COOKIES>, ...Escape<Rest>]
  : [];

type RemoveSantaFromRow<Input extends MazeItem[]> = Input extends [
  infer El,
  ...infer Rest extends MazeItem[]
]
  ? El extends "🎅"
    ? [Alley, ...RemoveSantaFromRow<Rest>]
    : [El, ...RemoveSantaFromRow<Rest>]
  : [];
type RemoveSanta<Input extends MazeMatrix> = Input extends [
  infer El extends MazeItem[],
  ...infer Rest extends MazeMatrix
]
  ? [RemoveSantaFromRow<El>, ...RemoveSanta<Rest>]
  : [];

type FillSantaToColumn<
  Input extends MazeItem[],
  Column extends number,
  Itr extends number[] = []
> = Input extends [infer El, ...infer Rest extends MazeItem[]]
  ? Itr["length"] extends Column
    ? ["🎅", ...FillSantaToColumn<Rest, Column, [...Itr, 0]>]
    : [El, ...FillSantaToColumn<Rest, Column, [...Itr, 0]>]
  : [];
type FillSanta<
  Input extends MazeMatrix,
  Row extends number,
  Column extends number,
  Itr extends number[] = []
> = Input extends [
  infer El extends MazeItem[],
  ...infer Rest extends MazeMatrix
]
  ? Itr["length"] extends Row
    ? [
        FillSantaToColumn<El, Column>,
        ...FillSanta<Rest, Row, Column, [...Itr, 0]>
      ]
    : [El, ...FillSanta<Rest, Row, Column, [...Itr, 0]>]
  : [];

type MoveUp<Input extends MazeMatrix> = FindSanta<Input>[0] extends 0
  ? Escape<Input>
  : Input[Decrement<FindSanta<Input>[0]>][FindSanta<Input>[1]] extends Alley
  ? FillSanta<
      RemoveSanta<Input>,
      Decrement<FindSanta<Input>[0]>,
      FindSanta<Input>[1]
    >
  : Input;
type MoveLeft<Input extends MazeMatrix> = FindSanta<Input>[1] extends 0
  ? Escape<Input>
  : Input[FindSanta<Input>[0]][Decrement<FindSanta<Input>[1]>] extends Alley
  ? FillSanta<
      RemoveSanta<Input>,
      FindSanta<Input>[0],
      Decrement<FindSanta<Input>[1]>
    >
  : Input;
type MoveRight<Input extends MazeMatrix> =
  FindSanta<Input>[1] extends Decrement<ColumnLimit<Input>>
    ? Escape<Input>
    : Increment<FindSanta<Input>[1]> extends number
    ? Input[FindSanta<Input>[0]][Increment<FindSanta<Input>[1]>] extends Alley
      ? FillSanta<
          RemoveSanta<Input>,
          FindSanta<Input>[0],
          Increment<FindSanta<Input>[1]>
        >
      : Input
    : never;
type MoveDown<Input extends MazeMatrix> = FindSanta<Input>[0] extends Decrement<
  RowLimit<Input>
>
  ? Escape<Input>
  : Increment<FindSanta<Input>[0]> extends number
  ? Input[Increment<FindSanta<Input>[0]>][FindSanta<Input>[1]] extends Alley
    ? FillSanta<
        RemoveSanta<Input>,
        Increment<FindSanta<Input>[0]>,
        FindSanta<Input>[1]
      >
    : Input
  : never;

type Move<
  Input extends MazeMatrix,
  Direction extends Directions
> = Direction extends "up"
  ? MoveUp<Input>
  : Direction extends "left"
  ? MoveLeft<Input>
  : Direction extends "right"
  ? MoveRight<Input>
  : Direction extends "down"
  ? MoveDown<Input>
  : Input;
