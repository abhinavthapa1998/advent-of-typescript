type DecipherNaughtyList<Sentence extends string> =
  Sentence extends `${infer name}/${infer rest}`
    ? name | DecipherNaughtyList<rest>
    : Sentence;
