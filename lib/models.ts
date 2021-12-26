export interface Manga {
  ID: string;
  Name: string;
  Alternatives: string;
  Author: Author;
  Status: string;
  Updated: string;
  Views: string;
  Rating: string;
  Description: string;
  Genres: Genre[];
  Chapters: Chapter[];
}

export interface Author {
  ID: string;
  Name: string;
  Mangas: null;
}

export interface Chapter {
  ID: string;
  MangaID: string;
  ChapterName: string;
  Views: string;
  Uploaded: string;
  Pages: string[];
}

export interface Genre {
  ID: string;
  GenreName: string;
  Mangas: null;
}
