type MovieGrade = {
  [key: number]: string;
};

export const movieGrades: MovieGrade =  {
  0: 'Bad',
  1: 'Bad',
  2: 'Bad',
  3: 'Normal',
  4: 'Normal',
  5: 'Normal',
  6: 'Good',
  7: 'Good',
  8: 'Very Good',
  9: 'Very Good',
  10: 'Awesome',
};

export const getRatingMovie = (grade: number): string => {
  if (movieGrades[grade]) {
    return movieGrades[grade];
  }

  return 'Unknown';
};

export const getFormattedRating = (rating: number): string =>
  rating.toFixed(1).replace('.', ',');
