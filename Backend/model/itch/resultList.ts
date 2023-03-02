import { contributor } from "../jamData/entry";

export type resultList = {
  generated_on: number;
  results: resultListObject[];
};

export type resultListObject = {
  title: string;
  rank: number;
  score: number;
  raw_score: number;
  cover_url: string;
  rating_count: number;
  coolness: number;
  contributors: contributor[];
  id: number;
  url: string;
  criteria: resultListCriteria[];
};

export type resultListCriteria = {
  raw_score: number;
  rank: number;
  score: number;
  name: string;
};
