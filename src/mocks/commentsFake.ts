import { datatype, lorem } from 'faker';

import { Comment, PostedComment } from '../types/types';

const movieStarsCount = datatype.number({
  min: 1,
  max: 10,
});

export const createMockComment = (): Comment => ({
  id: datatype.number(),
  user: {
    id: datatype.number(),
    name: lorem.words(),
  },
  rating: movieStarsCount,
  comment: lorem.paragraph(),
  date: new Date().toString(),
});

export const createMockComments = (): Comment[] => {
  const commentsCount = datatype.number({
    min: 3,
    max: 6,
  });

  return new Array(commentsCount).fill(null).map(() => createMockComment());
};

export const createMockCommentForMovie = (): PostedComment => ({
  rating: movieStarsCount,
  comment: lorem.paragraph(),
});
