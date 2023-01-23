export type entry = {
  title: string,
  id: number,
  rank: number,
  criteria: entry_criteria[],
  contributors: contributor[],
  jamPageUrl: string,
  platforms: string[],
  url: string,
  rating_count: number,
  ratings_given: number,
  karma: number,
}

export type entry_criteria = {
  name: string,
  score: number,
  rank: number,
  raw_score: number,
}

export type contributor = {
  name: string,
  id: number,
}