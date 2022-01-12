import { RouteProps } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

import { AppRoute, AuthorizationStatus } from '../../types/enum';
import { State } from '../../types/state';

const mapStateToProps = ({USER_AUTH}: State) => ({
  authorizationStatus: USER_AUTH.authorizationStatus,
});

const connector = connect(mapStateToProps);

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
}

type PropsFormRedux = PrivateRouteProps & ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  return (
    <Route
      exact={props.exact}
      path={props.path}
      render={
        () =>(
          props.authorizationStatus === AuthorizationStatus.Auth
            ?
            props.render()
            :
            <Redirect to={AppRoute.SignIn} />
        )
      }
    />
  );
}

export { PrivateRoute };
export default connector(PrivateRoute);
