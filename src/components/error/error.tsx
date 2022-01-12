import { Link } from 'react-router-dom';
import { memo } from 'react';

function Error(): JSX.Element {
  return (
    <div id="notfound">
      <div className="notfound-bg"></div>
      <div className="notfound">
        <div className="notfound-404">
          <h1>404!</h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
        <Link to="/" className="home-btn">Go Home</Link>
        <Link to="/login" className="login-btn">To Login</Link>
      </div>
    </div>
  );
}

export default memo(Error);

