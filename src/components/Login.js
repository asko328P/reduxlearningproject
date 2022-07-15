import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { login } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import { clearMessage } from '../actions/message';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const validateEmail = (value) => {
  const regularExpression = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }

  if (!regularExpression.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        You must input a valid email
      </div>
    );
  }
};
const Login = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeemail = (e) => {
    const email = e.target.value;
    setemail(email);
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
      dispatch(login(email, password, setLoading));
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/profile');
    }
  });
  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  const navigateToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="d-flex justify-content-md-center align-items-center vh-100 ">
      <div className="card-container w-25">
        <div className="d-flex justify-content-center p-3">
          <h3>Login with e-mail</h3>
        </div>
        <div className="d-flex justify-content-center p-3">
          <button className="btn shadow rounded-pill" onClick={navigateToRegister}>
            Or register instead:
          </button>
        </div>

        <Form onSubmit={handleLogin} ref={form} autoComplete="off">
          <div className="form-group p-2">
            <label className="p-2" htmlFor="email">
              Email
            </label>
            <Input type="text" className="form-control" name="email" value={email} onChange={onChangeemail} validations={[validateEmail]} />
          </div>
          <div className="form-group p-2">
            <label className="p-2" htmlFor="password">
              Password
            </label>
            <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[required]} />
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
