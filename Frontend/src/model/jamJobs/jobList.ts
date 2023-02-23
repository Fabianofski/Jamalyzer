export type jobList = {
  jobs: jamJob[];
};

export type jamJob = {
  jamTitle: string;
  jamLogo: string;
  jobProgress: string;
  jobState: string;
};
