import { Equal, Expect } from "type-testing";

type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
  board: EmptyBoard;
  state: "❌";
};

type PositionMap = {
  "top-left": ["0", "0"];
  "top-center": ["0", "1"];
  "top-right": ["0", "2"];
  "middle-left": ["1", "0"];
  "middle-center": ["1", "1"];
  "middle-right": ["1", "2"];
  "bottom-left": ["2", "0"];
  "bottom-center": ["2", "1"];
  "bottom-right": ["2", "2"];
};

type PlaceChipOnTuple<
  T extends TicTacToeCell[],
  X,
  Chip extends TicTacToeChip
> = {
  [K in keyof T]: K extends X ? (T[K] extends "  " ? Chip : T[K]) : T[K];
};

type PlaceChipOnMatrix<
  Board extends TicTactToeBoard,
  Position extends [string, string],
  Chip extends TicTacToeChip,
  $y = Position[0],
  $x = Position[1]
> = {
  [K in keyof Board]: K extends $y
    ? PlaceChipOnTuple<Board[K], $x, Chip>
    : Board[K];
};

type PlaceChip<
  Board extends TicTactToeBoard,
  Position extends [string, string],
  State extends TicTacToeState
> = State extends TicTacToeChip
  ? Extract<PlaceChipOnMatrix<Board, Position, State>, TicTactToeBoard>
  : Board;

type CheckCells<T extends TicTacToeCell[]> = T extends [infer A, ...infer B]
  ? B[number] extends A
    ? A extends "  "
      ? false
      : A
    : false
  : false;

type CheckRow<Board extends TicTactToeBoard, Row extends number> = CheckCells<
  Board[Row]
>;

type CheckRows<
  Board extends TicTactToeBoard,
  $iter extends number = 0 | 1 | 2
> = $iter extends number
  ? CheckRow<Board, $iter> extends infer Chip extends TicTacToeChip
    ? Chip
    : never
  : never;

type CheckColumn<
  Board extends TicTactToeBoard,
  Column extends number
> = CheckCells<[Board[0][Column], Board[1][Column], Board[2][Column]]>;

type CheckColumns<
  Board extends TicTactToeBoard,
  $iter extends number = 0 | 1 | 2
> = $iter extends number
  ? CheckColumn<Board, $iter> extends infer Chip extends TicTacToeChip
    ? Chip
    : never
  : never;

type DiagonalMap = [[[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]]];

type CheckDiagonal<
  Board extends TicTactToeBoard,
  N extends number
> = CheckCells<
  [
    Board[DiagonalMap[N][0][0]][DiagonalMap[N][0][1]],
    Board[DiagonalMap[N][1][0]][DiagonalMap[N][1][1]],
    Board[DiagonalMap[N][2][0]][DiagonalMap[N][2][1]]
  ]
>;

type CheckDiagonals<
  Board extends TicTactToeBoard,
  $iter extends number = 0 | 1
> = $iter extends number
  ? CheckDiagonal<Board, $iter> extends infer Chip extends TicTacToeChip
    ? Chip
    : never
  : never;

type Winner<Board extends TicTactToeBoard> =
  | CheckRows<Board>
  | CheckColumns<Board>
  | CheckDiagonals<Board>;

type CheckFilled<Board extends TicTactToeBoard> =
  "  " extends Board[number][number] ? false : true;

type NextGameState<
  Board extends TicTactToeBoard,
  State extends TicTacToeState,
  $winner = Winner<Board>
> = [$winner] extends [never]
  ? CheckFilled<Board> extends false
    ? State extends "❌"
      ? "⭕"
      : "❌"
    : "Draw"
  : `${$winner & string} Won`;

type TicTacToe<
  Game extends TicTacToeGame,
  Position extends TicTacToePositions,
  $Position extends [string, string] = PositionMap[Position],
  $nextBoard extends TicTactToeBoard = PlaceChip<
    Game["board"],
    $Position,
    Game["state"]
  >
> = {
  board: $nextBoard;
  state: $nextBoard extends Game["board"]
    ? Game["state"]
    : NextGameState<$nextBoard, Game["state"]>;
};

type test_move1_actual = TicTacToe<NewGame, "top-center">;
//   ^?
type test_move1_expected = {
  board: [["  ", "❌", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];
  state: "⭕";
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = TicTacToe<test_move1_actual, "top-left">;
//   ^?
type test_move2_expected = {
  board: [["⭕", "❌", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];
  state: "❌";
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = TicTacToe<test_move2_actual, "middle-center">;
//   ^?
type test_move3_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["  ", "  ", "  "]];
  state: "⭕";
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = TicTacToe<test_move3_actual, "bottom-left">;
//   ^?
type test_move4_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["⭕", "  ", "  "]];
  state: "❌";
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_x_win_actual = TicTacToe<test_move4_actual, "bottom-center">;
//   ^?
type test_x_win_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["⭕", "❌", "  "]];
  state: "❌ Won";
};
type test_x_win = Expect<Equal<test_x_win_actual, test_x_win_expected>>;

type type_move5_actual = TicTacToe<test_move4_actual, "bottom-right">;
//   ^?
type type_move5_expected = {
  board: [["⭕", "❌", "  "], ["  ", "❌", "  "], ["⭕", "  ", "❌"]];
  state: "⭕";
};
type test_move5 = Expect<Equal<type_move5_actual, type_move5_expected>>;

type test_o_win_actual = TicTacToe<type_move5_actual, "middle-left">;
//   ^?
type test_o_win_expected = {
  board: [["⭕", "❌", "  "], ["⭕", "❌", "  "], ["⭕", "  ", "❌"]];
  state: "⭕ Won";
};

// invalid move don't change the board and state
type test_invalid_actual = TicTacToe<test_move1_actual, "top-center">;
//   ^?
type test_invalid_expected = {
  board: [["  ", "❌", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];
  state: "⭕";
};
type test_invalid = Expect<Equal<test_invalid_actual, test_invalid_expected>>;

type test_before_draw = {
  board: [["⭕", "❌", "⭕"], ["⭕", "❌", "❌"], ["❌", "⭕", "  "]];
  state: "⭕";
};
type test_draw_actual = TicTacToe<test_before_draw, "bottom-right">;
//   ^?
type test_draw_expected = {
  board: [["⭕", "❌", "⭕"], ["⭕", "❌", "❌"], ["❌", "⭕", "⭕"]];
  state: "Draw";
};
type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;
