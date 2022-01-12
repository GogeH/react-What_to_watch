import { datatype, date, internet, lorem, name } from 'faker';

import { Movie } from '../types/types';

const createFullName = () => `${name.firstName()} ${name.lastName()}`;

export const createMockMovie = (): Movie => {
  const starringCount = datatype.number({
    min: 3,
    max: 6,
  });

  const actors = new Array(starringCount).fill(null).map(() => createFullName());

  return {
    id: datatype.number(),
    name: lorem.words(),
    posterImage: internet.url(),
    previewImage: internet.url(),
    backgroundImage: internet.url(),
    backgroundColor: internet.color(),
    videoLink: internet.url(),
    previewVideoLink: internet.url(),
    description: lorem.paragraph(),
    rating: datatype.number(),
    scoresCount: datatype.number(),
    director: createFullName(),
    starring: actors,
    genre: lorem.word(9),
    runTime: datatype.number(),
    released: date.past().getFullYear(),
    isFavorite: datatype.boolean(),
  };
};

export const createMockMovies = (): Movie[] => {
  const moviesCount = datatype.number({
    min: 8,
    max: 8,
  });

  return new Array(moviesCount).fill(null).map(() => createMockMovie());
};
