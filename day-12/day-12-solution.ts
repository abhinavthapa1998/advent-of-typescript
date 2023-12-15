type FindSanta<T> = T extends [...infer R, infer L]
  ? L extends "🎅🏼"
    ? R["length"]
    : FindSanta<R>
  : never;
