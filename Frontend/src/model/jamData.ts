import { jam } from "./jam";
import { ranking } from "./ranking";
import { entry } from "./entry";

export type jamData = {
  _id: string;
  errors?: string[];
  version: string;
  criteria: string[];
  jam: jam;
  jam_games: { [id: number]: entry };
  rankings: ranking;
};
