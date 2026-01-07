
export interface Movie {
  id: number | string;
  title: string;
  description: string;
  imageUrl: string;
  year?: number;
  matchScore?: number; // e.g., 98% Match
  genre?: string[];
  duration?: string;
  cast?: string[];
  creators?: string[];
  maturityRating?: string;
  tags?: string[];
  trailerUrl?: string;
}

export interface Category {
  title: string;
  movies: Movie[];
}

export interface AIRecommendation {
  title: string;
  description: string;
  year: string;
  genre: string;
  reason: string;
}

export interface Episode {
  id: number;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
}

export interface Profile {
  id: number;
  user_id?: string;
  name: string;
  avatar: string;
  color?: string;
  isKids: boolean;
  language: string;
  gameHandle?: string;
  maturitySetting: string;
  autoplayNext: boolean;
  autoplayPreviews: boolean;
  pin: string | null;
  dataUsage?: string;
  subtitleSettings?: {
     font: string;
     color: string;
     size: string;
     shadow: string;
     background: string;
  };
}
