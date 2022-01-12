import { useRef, FormEvent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { ThunkAppDispatch } from '../../types/action';
import { AuthData } from '../../types/types';
import { loginAction } from '../../store/api-action';
import Logo from '../logo/logo';
import Footer from '../footer/footer';

const EMAIL_VALID = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;
const PASSWORD_VALID = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  async onSubmit(authData: AuthData) {
    await dispatch(loginAction(authData));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFormRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFormRedux;

function SignIn(props: ConnectedComponentProps): JSX.Element {
  const [isEmailError, setEmailError] = useState<boolean>(false);
  const [isPasswordError, setPasswordError] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const isEmailValid = (email: string): boolean => EMAIL_VALID.test(email.toLowerCase());
  const isPasswordValid = (password: string): boolean => PASSWORD_VALID.test(password.toLowerCase());

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      const email = emailRef.current;
      const password = passwordRef.current;

      setEmailError(!isEmailValid(email.value));
      setPasswordError(!isPasswordValid(password.value));

      if (isEmailValid(email.value) && isPasswordValid(password.value)) {
        props.onSubmit({
          login: emailRef.current.value,
          password: passwordRef.current.value,
        });
      }
    }
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Logo />
        </div>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={onSubmit}
        >
          <div className="sign-in__message">
            {isEmailError && !isPasswordError && <p>We can’t recognize this email.<br/>Please try again.</p>}
            {isPasswordError && !isEmailError && <p>We can’t recognize this password combination.<br/>Please try again.</p>}
            {isEmailError && isPasswordError && <p>We can’t recognize this email <br/> and password combination. Please try again.</p>}
          </div>
          <div className="sign-in__fields">
            <div className={`sign-in__field ${isEmailError ? 'sign-in__field--error' : ''}`}>
              <input
                ref={emailRef}
                className="sign-in__input"
                type="text"
                placeholder="Email address"
                name="user-email"
                id="user-email"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={`sign-in__field ${isPasswordError ? 'sign-in__field--error' : ''}`}>
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />

    </div>
  );
}

export { SignIn };
export default connector(SignIn);
