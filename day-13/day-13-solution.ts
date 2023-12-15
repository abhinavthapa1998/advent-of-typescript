type DayCounter<
  Start extends number,
  End extends number,
  Counter extends number[] = []
> = Counter["length"] extends End
  ? Start
  : Start | DayCounter<[...Counter, 1]["length"], End, [...Counter, 1]>;
