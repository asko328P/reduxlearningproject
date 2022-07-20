import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../actions/auth';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
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
const validatePassword = (value) => {
  const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

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
        Password must contain at least 1 special symbol, at least 1 number and must be longer than 8 characters
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
const validatePhoneNumber = (value) => {
  const regularExpression = /^([+]46)\s*(7[0236])\s*(\d{4})\s*(\d{3})$/;

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
        You must input a valid swedish phone number, for example: +46734689122
      </div>
    );
  }
};
const Register = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };
  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePhoneNumber = (e) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
  };
  const handleRegistration = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(firstName, lastName, email, password, phoneNumber, setLoading));
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

  const navigateToLogin = () => {
    navigate('/');
  };

  return (
    <div className="d-flex justify-content-md-center align-items-center vh-100 ">
      <div className="card-container w-25">
        <div className="d-flex justify-content-center p-3">
          <h3>Register your account:</h3>
        </div>

        <div className="d-flex justify-content-center p-3">
          <button className="btn shadow rounded-pill" onClick={navigateToLogin}>
            Go to Login:
          </button>
        </div>

        <Form onSubmit={handleRegistration} ref={form}>
          <div className="form-group p-2">
            <label className="p-2" htmlFor="email">
              Email
            </label>
            <Input type="text" className="form-control" name="email" value={email} onChange={onChangeEmail} validations={[validateEmail]} />
          </div>
          <div className="form-group p-2">
            <label className="p-2" htmlFor="firstName">
              First name
            </label>
            <Input type="text" className="form-control" name="firstName" value={firstName} onChange={onChangeFirstName} validations={[required]} />
          </div>
          <div className="form-group p-2">
            <label className="p-2" htmlFor="lastName">
              Last name
            </label>
            <Input type="text" className="form-control" name="lastName" value={lastName} onChange={onChangeLastName} validations={[required]} />
          </div>
          <div className="form-group p-2">
            <label className="p-2" htmlFor="phoneNumber">
              Phone number
            </label>
            <Input type="text" className="form-control" name="phoneNumber" value={phoneNumber} onChange={onChangePhoneNumber} validations={[validatePhoneNumber]} />
          </div>
          <div className="form-group p-2">
            <label className="p-2" htmlFor="password">
              Password
            </label>
            <Input type="password" className="form-control" name="password" value={password} onChange={onChangePassword} validations={[validatePassword]} />
          </div>
          <div className="d-flex form-group justify-content-center p-3 ">
            <button className="btn btn-primary btn-block shadow rounded-pill w-100 " disabled={loading}>
              {loading && <span className="spinner-border spinner-border-sm"></span>}
              <span>Register account</span>
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

export default Register;
