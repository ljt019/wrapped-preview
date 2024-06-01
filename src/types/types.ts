export interface Artist {
  id: string;
  name: string;
  genres: string[];
  images: { url: string }[];
}

export interface Album {
  id: string;
  name: string;
  artists: Artist[];
  images: { url: string }[];
}

export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  popularity: Popularity;
  preview_url: string;
}
