export type ViewGenre = {
  genres: string[],
  activeGenre: string,
  onGenreChange: (genre: string) => void,
}
