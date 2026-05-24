export type ProjectOptions = {
  projectName: string;
  slug: string;
  title: string;
  target: 'mobile' | 'desktop';
  includeYandexGames: boolean;
  includePwa: boolean;
  includeArcadePhysics: boolean;
  includeTilemaps: boolean;
  includePlaywright: boolean;
};

export type GeneratedFile = {
  path: string;
  content: string;
};
