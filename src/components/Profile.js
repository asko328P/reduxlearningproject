import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user') === null) {
      navigate('/');
    }
  });

  return <div>Profile page</div>;
};

export default Profile;
