export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  Movie = '/films/:id',
  Review = '/films/:id/review',
  Player = '/player/:id',
  MyList = '/myList',
}

export enum APIRoute {
  Movies = '/films',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Promo = '/promo',
  SimilarMovies = '/films/:id/similar',
  FavoriteMovies = '/favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum FavoriteStatus {
  Favorite = 1,
  NotFavorite = 0,
}

export type ValuesOf<T> = T[keyof T];

export type FavoriteStatusType = ValuesOf<typeof FavoriteStatus>;
