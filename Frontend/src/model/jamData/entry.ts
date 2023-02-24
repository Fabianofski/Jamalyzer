export type entry = {
  title: string;
  id: number;
  rank: number;
  criteria: entry_criteria[];
  contributors: contributor[];
  jamPageUrl: string;
  platforms: string[];
  url: string;
  rating_count: number;
  ratings_given: number;
  karma: number;
  game_info_panel: game_info_panel;
};

export type entry_criteria = {
  name: string;
  score: number;
  rank: number;
  raw_score: number;
};

export type contributor = {
  name: string;
  id: number;
};

export type game_info_panel = {
  status?: string[];
  rating?: string[];
  genre?: string[];
  madeWith?: string[];
  tags?: string[];
  codeLicense?: string[];
  assetLicense?: string[];
  averageSession?: string[];
  languages?: string[];
  inputs?: string[];
  accessibility?: string[];
};
