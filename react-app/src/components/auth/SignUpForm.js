import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './AuthForms.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
		setErrors(['Both passwords must match, please try again']);
	}

  };

  	const toLogin = async (e) => {
		e.preventDefault();
		history.push("/login");
	};

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
		<form className="auth-form" onSubmit={onSignUp}>
			<div className="login-text">
				<h3 id="h3-login">Do yourself a favour.</h3>
				<h4 id="h4-login">
					Sign up for exclusive stays in your new favourite estate.
				</h4>
			</div>
			<div className="form-errors center">
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div className="auth-fields">
				<label>Username</label>
				<input
					type="text"
					name="username"
					onChange={updateUsername}
					placeholder="Username"
					value={username}
				></input>
			</div>
			<div className="auth-fields">
				<label>Email</label>
				<input
					type="text"
					name="email"
					placeholder="Email"
					onChange={updateEmail}
					value={email}
				></input>
			</div>
			<div className="auth-fields">
				<label>Password</label>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={updatePassword}
					value={password}
				></input>
			</div>
			<div className="auth-fields">
				<label>Repeat Password</label>
				<input
					type="password"
					name="repeat_password"
					placeholder="Repeat Password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
				></input>
			<div id="signup-button">
				<button className="btn" type="submit">
					Sign Up
				</button>
			</div>
			<p>Don't have an account?</p>
			<button id="to-log-in" className="btn-pink" onClick={toLogin}>
				Log in!
			</button>
			</div>
		</form>
  );
};

export default SignUpForm;
