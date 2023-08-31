export interface MoviesList {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Error {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface Movie extends Error {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
