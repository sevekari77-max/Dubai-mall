export type UserPath = 'retail' | 'sponsor' | 'event' | 'explore';
export type ExperienceStage = 'intro' | 'pathSelect' | 'experience';

export type Zone = {
  id: string;
  name: string;
  tagline: string;
  area: string;
  stats: { label: string; value: string }[];
  description: string;
  color: string;
  accentColor: string;
  image: string;
  gridArea: string;
};

export type ContentModule = {
  id: string;
  title: string;
  headline: string;
  subtext: string;
  stats: { value: string; label: string; prefix?: string }[];
  image: string;
  relevantFor: UserPath[];
};

export type SimulatorResult = {
  exposure: number;
  reach: number;
  impressions: number;
  roiMultiple: number;
};
