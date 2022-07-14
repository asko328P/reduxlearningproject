import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { login } from '../actions/auth';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password, setLoading));
    } else {
      setLoading(false);
    }
  };
  if (JSON.parse(localStorage.getItem('user'))) {
    // todo: redirect to a specific page,
    return <div>Already logged in</div>;
  }
  return (
    <div className="d-flex justify-content-md-center align-items-center vh-100 ">
      <div className="card-container w-25">
        <div className="d-flex justify-content-center p-3">
          <h3>Login with e-mail</h3>
        </div>

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <Input type="text" className="form-control" name="username" value={username} onChange={onChangeUsername} validations={[required]} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required]} />
          </div>
          <div className="d-flex w-100 flex-row-reverse small p-3">
            <a className="" href="/">
              Forgot password?
            </a>
          </div>
          <div className="d-flex form-group justify-content-center p-3 ">
            <button className="btn btn-primary btn-block shadow rounded-pill w-100 " disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Login</span>
            </button>
          </div>
          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
        <hr />
      </div>
    </div>
  );
};
export default Login;
