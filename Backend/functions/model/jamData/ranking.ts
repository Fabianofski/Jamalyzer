export type ranking = {
  Overall: { [rank: number]: number[] };
  [name: string]: { [rank: number]: number[] };
};
