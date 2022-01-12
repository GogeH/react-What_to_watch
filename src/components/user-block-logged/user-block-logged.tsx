import { memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logoutAction } from '../../store/api-action';
import { AppRoute } from '../../types/enum';
import { getAuthInfo } from '../../store/reducers/user-auth/selector-user-auth';

function UserBlockLogged(): JSX.Element {
  const authInfo = useSelector(getAuthInfo);

  const dispatch = useDispatch();

  const handleSignInButtonClick = (event: MouseEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={AppRoute.MyList}>
          <div className="user-block__avatar">
            <img src={authInfo.avatarUrl} alt={authInfo.name} width="63" height="63" />
          </div>
        </Link>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" href='/' onClick={handleSignInButtonClick}>Sign out</a>
      </li>
    </ul>
  );
}

export default memo(UserBlockLogged);

