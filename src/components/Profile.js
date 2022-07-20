import React from 'react';
import { logout } from '../actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };
  const navigateToBicycles = (e) => {
    e.preventDefault();
    navigate('/bicycles');
  };
  return (
    <div>
      Profile page
      <div className="d-flex justify-content-center p-3">
        <button className="btn shadow rounded-pill" onClick={handleLogout}>
          Log out:
        </button>
      </div>
      <div className="d-flex justify-content-center p-3">
        <button className="btn shadow rounded-pill" onClick={navigateToBicycles}>
          View your bicycles:
        </button>
      </div>
    </div>
  );
};

export default Profile;
