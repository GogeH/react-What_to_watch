import { act, render } from '@testing-library/react';

import VideoPreview from './video-preview';
import { createMockMovie } from '../../mocks/movieFake';

const { previewVideoLink, previewImage } = createMockMovie();

describe('Component: VideoPreview', () => {
  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.load = jest.fn();

  it('render correct', () => {
    const { container } = render(
      <VideoPreview
        src={previewVideoLink}
        poster={previewImage}
        isPlaying
      />);

    expect(container.querySelector('video')).toBeInTheDocument();
  });

  it('should play when isPlayed is true', async () => {
    render(
      <VideoPreview
        src={previewVideoLink}
        poster={previewImage}
        isPlaying
      />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect(window.HTMLMediaElement.prototype.play).toBeCalledTimes(1);
  });
});
