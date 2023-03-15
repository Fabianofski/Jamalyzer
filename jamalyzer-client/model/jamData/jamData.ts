import { jam } from "./jam";
import { ranking } from "./ranking";
import { entry } from "./entry";

export type jamData = {
  _id: string;
  errors?: string[];
  version: string;
  extendedData: boolean;
  criteria: string[];
  jam: jam;
  jam_games: { [id: string]: entry };
  rankings: ranking;
};
