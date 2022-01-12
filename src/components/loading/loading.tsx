import { memo } from 'react';

function Loading(): JSX.Element {
  return (
    <div className="load">
      <div>G</div>
      <div>N</div>
      <div>I</div>
      <div>D</div>
      <div>A</div>
      <div>O</div>
      <div>L</div>
    </div>
  );
}

export default memo(Loading);
