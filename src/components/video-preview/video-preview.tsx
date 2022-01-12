import { memo, useEffect, useRef } from 'react';

function VideoPreview(props: {
  poster: string,
  src: string,
  isPlaying: boolean,
}): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (videoRef.current && props.isPlaying) {
      timeoutId = setTimeout(() => {
        videoRef.current?.play();
      }, 1000);
    }

    if (videoRef.current && !props.isPlaying) {
      videoRef.current.load();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [props.isPlaying, videoRef]);

  return (
    <video
      muted
      ref={videoRef}
      src={props.src}
      poster={props.poster}
      width="327"
      height="218"
    />
  );
}

export default memo(VideoPreview);
