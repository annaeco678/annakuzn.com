export interface Project {
  id: string;
  title: string;
  year: string;
  role: string;
  description: string;
  longDescription: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  client?: string;
  tags: string[];
  metrics?: string[];
  features?: string[];
  
  // Custom premium fields for Brick.dev / EcoSort realistic image flow
  introHeading?: string;
  introText?: string;
  bulletsTitleTg?: string;
  bulletsIntroTg?: string;
  bulletsTg?: string[];
  bulletsTitleClick?: string;
  bulletsIntroClick?: string;
  bulletsClick?: string[];
  caseDashboardImages?: string[];
  nextWorkId?: string;
  nextWorkImage?: string;
  figmaLink?: string;
  websiteLink?: string;
}

export type TabType = 'home' | 'info' | 'works' | 'contact';
