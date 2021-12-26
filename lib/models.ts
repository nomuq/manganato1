export interface Manga {
  id: string;
  name: string;
  image: string;
  alternatives: string;
  author: Author;
  status: string;
  updated: string;
  views: string;
  rating: string;
  description: string;
  genres: Genre[];
  chapters: Chapter[];
}

export interface Author {
  id: string;
  name: string;
}

export interface Chapter {
  id: string;
  manga_id: string;
  chapter_name: string;
  views: string;
  uploaded: string;
  pages: string[];
}

export interface Genre {
  id: string;
  genre_name: string;
  Mangas: null;
}
