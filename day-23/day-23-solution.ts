// Connect 4, but in TypeScript types
// Your goal for this challenge is to implement Connect 4 in TypeScript types.

// Each cell in the game can contain 🔴 or 🟡 or be empty ( ).
// You're provided with a rough layout of how to organize the board in the EmptyBoard type.
// The game state is represented by an object with a board property and a state property (which keeps track of which player is next up to play).

// What is Connect 4
// In case you haven't played it before: Connect 4 is a game in which the players choose a color and then take turns dropping colored tokens into a six-row, seven-column vertically suspended grid.
// The pieces fall straight down, occupying the lowest available space within the column.
// The objective of the game is to be the first to form a horizontal, vertical, or diagonal line of four of one's own tokens.

// fun fact: Connect 4 is also known as Connect Four, Four Up, Plot Four, Find Four, Captain's Mistress, Four in a Row, Drop Four, and Gravitrips in the Soviet Union

// another fun fact: Connect 4 was "solved" by James Allen and Victor Allis (independently from one another.. like two weeks apart!) in 1988.
// They couldn't do a full brute-force proof at the time, but 7 years later John Tromp in the Netherlands did it with a database on a Sun Microsystems and Silicon Graphics International worksations (for a combined total of 40,000 computation hours!).

// Tests
import { Expect, Equal } from "type-testing";

type test_move1_actual = Connect4<NewGame, 0>;
//   ^?
type test_move1_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "]
  ];
  state: "🔴";
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = Connect4<test_move1_actual, 0>;
//   ^?
type test_move2_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "]
  ];
  state: "🟡";
};
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = Connect4<test_move2_actual, 0>;
//   ^?
type test_move3_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "]
  ];
  state: "🔴";
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = Connect4<test_move3_actual, 1>;
//   ^?
type test_move4_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "  ", "  ", "  ", "  ", "  "]
  ];
  state: "🟡";
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_move5_actual = Connect4<test_move4_actual, 2>;
//   ^?
type test_move5_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "  ", "  ", "  ", "  "]
  ];
  state: "🔴";
};
type test_move5 = Expect<Equal<test_move5_actual, test_move5_expected>>;

type test_move6_actual = Connect4<test_move5_actual, 1>;
//   ^?
type test_move6_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "🔴", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "  ", "  ", "  ", "  "]
  ];
  state: "🟡";
};
type test_move6 = Expect<Equal<test_move6_actual, test_move6_expected>>;

type test_red_win_actual = Connect4<
  {
    board: [
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🔴", "🔴", "🔴", "  ", "  ", "  ", "  "],
      ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
    ];
    state: "🔴";
  },
  3
>;

type test_red_win_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "🔴", "🔴", "🔴", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
  ];
  state: "🔴 Won";
};

type test_red_win = Expect<Equal<test_red_win_actual, test_red_win_expected>>;

type test_yellow_win_actual = Connect4<
  {
    board: [
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🔴", "  ", "🔴", "🔴", "  ", "  ", "  "],
      ["🟡", "  ", "🟡", "🟡", "  ", "  ", "  "]
    ];
    state: "🟡";
  },
  1
>;

type test_yellow_win_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "  ", "🔴", "🔴", "  ", "  ", "  "],
    ["🟡", "🟡", "🟡", "🟡", "  ", "  ", "  "]
  ];
  state: "🟡 Won";
};

type test_yellow_win = Expect<
  Equal<test_yellow_win_actual, test_yellow_win_expected>
>;

type test_diagonal_yellow_win_actual = Connect4<
  {
    board: [
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "🟡", "🔴", "  ", "  ", "  "],
      ["🔴", "🟡", "🔴", "🔴", "  ", "  ", "  "],
      ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
    ];
    state: "🟡";
  },
  3
>;

type test_diagonal_yellow_win_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "🟡", "  ", "  ", "  "],
    ["  ", "  ", "🟡", "🔴", "  ", "  ", "  "],
    ["🔴", "🟡", "🔴", "🔴", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "🟡", "  ", "  ", "  "]
  ];
  state: "🟡 Won";
};

type test_diagonal_yellow_win = Expect<
  Equal<test_diagonal_yellow_win_actual, test_diagonal_yellow_win_expected>
>;

type test_draw_actual = Connect4<
  {
    board: [
      ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "  "],
      ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
      ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
      ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
      ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
      ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"]
    ];
    state: "🟡";
  },
  6
>;

type test_draw_expected = {
  board: [
    ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
    ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
    ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
    ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"],
    ["🟡", "🔴", "🔴", "🟡", "🟡", "🔴", "🟡"],
    ["🔴", "🟡", "🟡", "🔴", "🔴", "🟡", "🔴"]
  ];
  state: "Draw";
};

type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;

// Additional Tests
type test_column_win_actual = Connect4<
  {
    board: [
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "🔴", "  ", "  ", "  ", "  "],
      ["🟡", "🔴", "🔴", "  ", "  ", "  ", "  "]
    ];
    state: "🟡";
  },
  0
>;
type test_column_win_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "  ", "🔴", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "🔴", "  ", "  ", "  ", "  "]
  ];
  state: "🟡 Won";
};
type test_column_win = Expect<
  Equal<test_column_win_actual, test_column_win_expected>
>;

type test_left_diagonal_win_actual = Connect4<
  {
    board: [
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
      ["  ", "🟡", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "🔴", "🟡", "  ", "🔴", "  ", "  "],
      ["🟡", "🟡", "🔴", "🔴", "🟡", "  ", "  "],
      ["🟡", "🔴", "🔴", "🔴", "🟡", "  ", "  "]
    ];
    state: "🔴";
  },
  0
>;
type test_left_diagonal_win_expected = {
  board: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["🔴", "🟡", "  ", "  ", "  ", "  ", "  "],
    ["🟡", "🔴", "🟡", "  ", "🔴", "  ", "  "],
    ["🟡", "🟡", "🔴", "🔴", "🟡", "  ", "  "],
    ["🟡", "🔴", "🔴", "🔴", "🟡", "  ", "  "]
  ];
  state: "🔴 Won";
};
type test_diagonal_left_win = Expect<
  Equal<test_left_diagonal_win_actual, test_left_diagonal_win_expected>
>;

type test_invalid_move_actual = Connect4<
  {
    board: [
      ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🔴", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "  ", "  ", "  ", "  ", "  "],
      ["🟡", "  ", "🔴", "  ", "  ", "  ", "  "],
      ["🟡", "🔴", "🔴", "  ", "  ", "  ", "  "]
    ];
    state: "🟡";
  },
  0
>;
type test_invalid_move = Expect<Equal<test_invalid_move_actual, never>>;

type test_double_size_board_actual = Connect4<
  {
    board: [
      [
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  "
      ],
      [
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  ",
        "  "
      ],
      [
        "  ",
        "  ",
        "🔴",
        "🟡",
        "  ",
        "  ",
        "  ",
        "  ",
        "🔴",
        "  ",
        "  ",
        "  ",
        "  ",
        "  "
      ],
      [
        "  ",
        "🔴",
        "🟡",
        "🔴",
        "  ",
        "  ",
        "  ",
        "  ",
        "🟡",
        "  ",
        "  ",
        "  ",
        "🟡",
        "  "
      ],
      [
        "🔴",
        "🔴",
        "🔴",
        "🟡",
        "  ",
        "  ",
        "  ",
        "  ",
        "🔴",
        "  ",
        "  ",
        "  ",
        "🔴",
        "🔴"
      ],
      [
        "🟡",
        "🟡",
        "🟡",
        "🔴",
        "  ",
        "  ",
        "  ",
        "🟡",
        "🟡",
        "  ",
        "  ",
        "  ",
        "🟡",
        "🟡"
      ],
      [
        "🔴",
        "🔴",
        "🔴",
        "🟡",
        "  ",
        "  ",
        "  ",
        "🔴",
        "🔴",
        "  ",
        "  ",
        "  ",
        "🔴",
        "🔴"
      ],
      [
        "🟡",
        "🟡",
        "🟡",
        "🔴",
        "  ",
        "  ",
        "  ",
        "🟡",
        "🟡",
        "🔴",
        "  ",
        "  ",
        "🟡",
        "🟡"
      ],
      [
        "🔴",
        "🔴",
        "🔴",
        "🟡",
        "  ",
        "  ",
        "🔴",
        "🟡",
        "🔴",
        "🟡",
        "  ",
        "  ",
        "🔴",
        "🔴"
      ],
      [
        "🟡",
        "🟡",
        "🟡",
        "🔴",
        "  ",
        "  ",
        "🟡",
        "🟡",
        "🟡",
        "🔴",
        "🔴",
        "  ",
        "🟡",
        "🟡"
      ],
      [
        "🔴",
        "🔴",
        "🔴",
        "🟡",
        "  ",
        "  ",
        "🔴",
        "🔴",
        "🔴",
        "🟡",
        "🟡",
        "  ",
        "🔴",
        "🔴"
      ],
      [
        "🟡",
        "🟡",
        "🟡",
        "🔴",
        "  ",
        "  ",
        "🟡",
        "🟡",
        "🟡",
        "🔴",
        "🔴",
        "  ",
        "🟡",
        "🟡"
      ],
      [
        "🔴",
        "🔴",
        "🔴",
        "🟡",
        "  ",
        "  ",
        "🔴",
        "🔴",
        "🔴",
        "🟡",
        "🟡",
        "  ",
        "🔴",
        "🔴"
      ],
      [
        "🟡",
        "🟡",
        "🟡",
        "🔴",
        "  ",
        "  ",
        "🟡",
        "🟡",
        "🟡",
        "🔴",
        "🔴",
        "🔴",
        "🟡",
        "🟡"
      ]
    ];
    state: "🟡";
  },
  9
>;
type test_double_size_board_expected = {
  board: [
    [
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  "
    ],
    [
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  ",
      "  "
    ],
    [
      "  ",
      "  ",
      "🔴",
      "🟡",
      "  ",
      "  ",
      "  ",
      "  ",
      "🔴",
      "  ",
      "  ",
      "  ",
      "  ",
      "  "
    ],
    [
      "  ",
      "🔴",
      "🟡",
      "🔴",
      "  ",
      "  ",
      "  ",
      "  ",
      "🟡",
      "  ",
      "  ",
      "  ",
      "🟡",
      "  "
    ],
    [
      "🔴",
      "🔴",
      "🔴",
      "🟡",
      "  ",
      "  ",
      "  ",
      "  ",
      "🔴",
      "  ",
      "  ",
      "  ",
      "🔴",
      "🔴"
    ],
    [
      "🟡",
      "🟡",
      "🟡",
      "🔴",
      "  ",
      "  ",
      "  ",
      "🟡",
      "🟡",
      "  ",
      "  ",
      "  ",
      "🟡",
      "🟡"
    ],
    [
      "🔴",
      "🔴",
      "🔴",
      "🟡",
      "  ",
      "  ",
      "  ",
      "🔴",
      "🔴",
      "🟡",
      "  ",
      "  ",
      "🔴",
      "🔴"
    ],
    [
      "🟡",
      "🟡",
      "🟡",
      "🔴",
      "  ",
      "  ",
      "  ",
      "🟡",
      "🟡",
      "🔴",
      "  ",
      "  ",
      "🟡",
      "🟡"
    ],
    [
      "🔴",
      "🔴",
      "🔴",
      "🟡",
      "  ",
      "  ",
      "🔴",
      "🟡",
      "🔴",
      "🟡",
      "  ",
      "  ",
      "🔴",
      "🔴"
    ],
    [
      "🟡",
      "🟡",
      "🟡",
      "🔴",
      "  ",
      "  ",
      "🟡",
      "🟡",
      "🟡",
      "🔴",
      "🔴",
      "  ",
      "🟡",
      "🟡"
    ],
    [
      "🔴",
      "🔴",
      "🔴",
      "🟡",
      "  ",
      "  ",
      "🔴",
      "🔴",
      "🔴",
      "🟡",
      "🟡",
      "  ",
      "🔴",
      "🔴"
    ],
    [
      "🟡",
      "🟡",
      "🟡",
      "🔴",
      "  ",
      "  ",
      "🟡",
      "🟡",
      "🟡",
      "🔴",
      "🔴",
      "  ",
      "🟡",
      "🟡"
    ],
    [
      "🔴",
      "🔴",
      "🔴",
      "🟡",
      "  ",
      "  ",
      "🔴",
      "🔴",
      "🔴",
      "🟡",
      "🟡",
      "  ",
      "🔴",
      "🔴"
    ],
    [
      "🟡",
      "🟡",
      "🟡",
      "🔴",
      "  ",
      "  ",
      "🟡",
      "🟡",
      "🟡",
      "🔴",
      "🔴",
      "🔴",
      "🟡",
      "🟡"
    ]
  ];
  state: "🟡 Won";
};
type test_double_size_board = Expect<
  Equal<test_double_size_board_actual, test_double_size_board_expected>
>;

// Setup
type Connect4Chips = "🔴" | "🟡";
type Connect4Cell = Connect4Chips | "  ";
type Connect4State = "🔴" | "🟡" | "🔴 Won" | "🟡 Won" | "Draw";

type EmptyBoard = [
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ["  ", "  ", "  ", "  ", "  ", "  ", "  "]
];

type NewGame = {
  board: EmptyBoard;
  state: "🟡";
};

// Answer
type Connect4Board = Connect4Cell[][];
type Connect4Game = {
  board: Connect4Board;
  state: Connect4State;
};
type Connect4EndState = Exclude<Connect4State, Connect4Chips>;

type Connect4<
  Game extends Connect4Game,
  Move extends StringToNumber<Extract<keyof Game["board"][number], `${number}`>>
> = Game["state"] extends Connect4EndState
  ? Game
  : NextGame<
      DropChip<Game["board"], Exclude<Game["state"], Connect4EndState>, Move>,
      Exclude<Game["state"], Connect4EndState>
    >;

type StringToNumber<S> = S extends `${infer N extends number}` ? N : never;

type DropChip<
  Board extends Connect4Board,
  Chip extends Connect4Chips,
  Move extends number
> = Board extends [
  ...infer Top extends Connect4Board,
  infer Bottom extends Connect4Cell[]
]
  ? Bottom[Move] extends Connect4Chips
    ? [...DropChip<Top, Chip, Move>, Bottom]
    : [...Top, InsertChip<Bottom, Chip, Move>]
  : never;

type InsertChip<
  Row extends Connect4Cell[],
  Chip extends Connect4Chips,
  Move extends number,
  NewRow extends Connect4Cell[] = []
> = Row extends [
  infer First extends Connect4Cell,
  ...infer Rest extends Connect4Cell[]
]
  ? NewRow["length"] extends Move
    ? [...NewRow, Chip, ...Rest]
    : InsertChip<Rest, Chip, Move, [...NewRow, First]>
  : never;

type NextGame<
  NextBoard extends Connect4Board,
  PreviousChip extends Connect4Chips
> = NextBoard extends never
  ? never
  : {
      board: NextBoard;
      state: NextState<NextBoard, PreviousChip>;
    };

type NextState<
  Board extends Connect4Board,
  PreviousChip extends Connect4Chips
> =
  | RowWin<Board>
  | RowWin<Transpose<Board>>
  | RowWin<Diagonals<Board>>
  | RowWin<Diagonals<ReverseRows<Board>>> extends false
  ? IsFull<Board> extends true
    ? "Draw"
    : Exclude<Connect4Chips, PreviousChip>
  : `${PreviousChip} Won`;

type RowWin<Board extends Connect4Board> = Board extends [
  infer First extends Connect4Cell[],
  ...infer Rest extends Connect4Board
]
  ? RowToString<First> extends `${string}${"🟡🟡🟡🟡" | "🔴🔴🔴🔴"}${string}`
    ? true
    : RowWin<Rest>
  : false;

type RowToString<
  Row extends Connect4Cell[],
  S extends string = ""
> = Row extends [
  infer First extends Connect4Cell,
  ...infer Rest extends Connect4Cell[]
]
  ? RowToString<Rest, `${S}${First}`>
  : S;

type Transpose<
  Board extends Connect4Board,
  ColumnAcc extends "+"[] = [],
  T extends Connect4Board = []
> = ColumnAcc["length"] extends Board[number]["length"]
  ? T
  : Transpose<
      Board,
      [...ColumnAcc, "+"],
      [...T, ColumnToRow<Board, ColumnAcc["length"]>]
    >;

type ColumnToRow<
  Board extends Connect4Board,
  Column extends number,
  RowAcc extends "+"[] = [],
  Row extends Connect4Cell[] = []
> = RowAcc["length"] extends Board["length"]
  ? Row
  : ColumnToRow<
      Board,
      Column,
      [...RowAcc, "+"],
      [...Row, Board[RowAcc["length"]][Column]]
    >;

type Diagonals<
  Board extends Connect4Board,
  ColumnAcc extends "+"[] = [],
  Rows extends Connect4Board = []
> = Board extends [any, ...infer Rest extends Connect4Board]
  ? ColumnAcc["length"] extends Board[number]["length"]
    ? Diagonals<Rest, [], Rows>
    : Diagonals<
        Board,
        [...ColumnAcc, "+"],
        [...Rows, DiagonalToRow<Board, ColumnAcc["length"]>]
      >
  : Rows;

type DiagonalToRow<
  Board extends Connect4Board,
  StartColumn extends number,
  FilterAcc extends "+"[] = [],
  RowAcc extends "+"[] = [],
  ColAcc extends "+"[] = [],
  Row extends Connect4Cell[] = []
> = FilterAcc["length"] extends StartColumn
  ? Board["length"] extends RowAcc["length"]
    ? Row
    : Board[number]["length"] extends ColAcc["length"]
    ? Row
    : DiagonalToRow<
        Board,
        StartColumn,
        FilterAcc,
        [...RowAcc, "+"],
        [...ColAcc, "+"],
        Board[RowAcc["length"]][ColAcc["length"]] extends Connect4Cell
          ? [...Row, Board[RowAcc["length"]][ColAcc["length"]]]
          : Row
      >
  : DiagonalToRow<
      Board,
      StartColumn,
      [...FilterAcc, "+"],
      [],
      [...ColAcc, "+"],
      []
    >;

type ReverseRows<
  Board extends Connect4Board,
  Reverse extends Connect4Board = []
> = Board extends [...infer First extends Connect4Board, infer Last]
  ? [Last, ...ReverseRows<First>]
  : Reverse;

type IsFull<Board extends Connect4Board> =
  Board[number][number] extends Connect4Chips ? true : false;
