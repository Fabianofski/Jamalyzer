export type entryList = {
  generated_on: number;
  jam_games: entryListObject[];
};

export type entryListObject = {
  rating_count: number;
  coolness: number;
  contributors: { name: string; url: string }[];
  id: number;
  url: string;
  created_at: string;
  game: game;
};

export type game = {
  cover_color: string;
  title: string;
  platforms: string[];
  cover: string;
  id: number;
  url: string;
  user: { id: number; url: string; name: string };
  short_text: string;
};
