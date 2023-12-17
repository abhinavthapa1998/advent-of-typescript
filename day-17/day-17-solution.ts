type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";

type WinMatchup = ["👊🏻", "✌🏽"] | ["🖐🏾", "👊🏻"] | ["✌🏽", "🖐🏾"];

type WhoWins<
  T extends RockPaperScissors,
  U extends RockPaperScissors
> = T extends U ? "draw" : [T, U] extends WinMatchup ? "lose" : "win";

type test_0_actual = WhoWins<"👊🏻", "🖐🏾">;
//   ^?
type test_0_expected = "win";
