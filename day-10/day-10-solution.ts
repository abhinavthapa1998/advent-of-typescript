type StreetSuffixTester<
  Sentence extends string,
  Suffix extends string
> = Sentence extends `${infer First}${Suffix}` ? true : false;
