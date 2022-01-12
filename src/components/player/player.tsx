import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import { MovieParam } from '../../types/types';
import { Movie } from '../../types/types';
import Error from '../error/error';
import PlayButton from './player-button';
import { getRemainingTime } from '../../utils/get-remaining-time';
import Spinner from '../spinner/spinner';
import { getMoviesSelector } from '../../store/reducers/movies-data/selector-movies-data';

const GHOST_PERCENTAGE = 100;
const LOADING_TIME = '00:00';

function Player(): JSX.Element {
  const movies = useSelector(getMoviesSelector);

  const { id } = useParams<MovieParam>();
  const history = useHistory();

  const selectedMovie = movies.find((movie: Movie) => movie.id.toString() === id);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const {current: videoElement} = videoRef;
  const progressBarRef = useRef<HTMLProgressElement>(null);
  const {current: progressBarElement} = progressBarRef;

  const [isReady, setReady] = useState(false);
  const [isPlay, setPlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [{duration, remainingTime}, setDuration] = useState({duration: 0, remainingTime: 0});

  useEffect(() => {
    if (!isReady || !videoElement) {
      return;
    }

    const videoDuration = Math.round(videoElement.duration);
    setDuration((state) => ({
      ...state, duration: videoDuration, remainingTime: videoDuration,
    }));
  }, [isReady, videoElement]);

  useEffect(() => {
    const play = async (video: HTMLVideoElement) => {
      try {
        await video.play();
      } catch {
        setPlay(false);
      }
    };

    if (!videoElement) {
      return;
    }

    if (isPlay) {
      play(videoElement);
      return;
    }

    videoElement.pause();
  }, [isPlay, videoElement]);

  const remainingMovieTime  = isReady ? getRemainingTime(remainingTime) : LOADING_TIME;

  const handlePlayButtonClick = () => {
    setPlay((prevState) => !prevState);
  };

  const handleDataLoaded = () => {
    setReady(true);
  };

  const handleTimeUpdate = () => {
    if (!videoElement || !progressBarElement) {
      return;
    }

    const currentVideoTime = videoElement.currentTime;
    const currentPercentage = currentVideoTime / duration * GHOST_PERCENTAGE;
    const currentRemainingTime = Math.round(duration * (GHOST_PERCENTAGE - currentPercentage) / GHOST_PERCENTAGE);

    setDuration((state) => ({
      ...state, remainingTime: currentRemainingTime,
    }));
    setCurrentTime(currentPercentage);
    progressBarElement.value = currentVideoTime;
  };

  const handleFullScreenClick = () => {
    if (videoElement) {
      videoElement.requestFullscreen();
    }
  };

  const handleExitPlayer = (): void => {
    history.goBack();
  };

  if (!selectedMovie) {
    return <Error />;
  }

  return (
    <div className="player">

      {!isReady && <Spinner />}

      <video
        className="player__video"
        ref={videoRef}
        src={selectedMovie.videoLink}
        poster={selectedMovie.previewImage}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleDataLoaded}
      />

      <button type="button" className="player__exit" onClick={handleExitPlayer}>
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" max={duration} ref={progressBarRef}/>
            <div className="player__toggler" style={{left: `${currentTime}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{remainingMovieTime }</div>
        </div>

        <div className="player__controls-row">
          <PlayButton
            isPlay={isPlay}
            isReady={isReady}
            handlePlayButtonClick={handlePlayButtonClick}
          />

          <div className="player__name">{selectedMovie.name}</div>

          <button
            type="button"
            className="player__full-screen"
            disabled={!isReady}
            onClick={handleFullScreenClick}
          >

            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"/>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Player);

