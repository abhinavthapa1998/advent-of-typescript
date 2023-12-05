type SantasList<T extends readonly unknown[], K extends readonly unknown[]> = [
  ...T,
  ...K
];
