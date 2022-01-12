import { AuthInfo, Movie, ServerAuthInfo } from '../types/types';

export function adaptMoviesDataToClient(data: Record<string, unknown>): Movie {
  const adaptedMovie = Object.assign({}, data, {
    posterImage: data['poster_image'],
    previewImage: data['preview_image'],
    backgroundImage: data['background_image'],
    backgroundColor: data['background_color'],
    scoresCount: data['scores_count'],
    runTime: data['run_time'],
    isFavorite: data['is_favorite'],
    videoLink: data['video_link'],
    previewVideoLink: data['preview_video_link'],
  });

  delete adaptedMovie['poster_image'];
  delete adaptedMovie['preview_image'];
  delete adaptedMovie['background_image'];
  delete adaptedMovie['background_color'];
  delete adaptedMovie['scores_count'];
  delete adaptedMovie['run_time'];
  delete adaptedMovie['is_favorite'];
  delete adaptedMovie['video_link'];
  delete adaptedMovie['preview_video_link'];

  return adaptedMovie as Movie;
}

export const adaptAuthInfoDataToClient = (data: ServerAuthInfo): AuthInfo => ({
  avatarUrl: data['avatar_url'],
  email: data.email,
  id: data.id,
  name: data.name,
  token: data.token,
});
