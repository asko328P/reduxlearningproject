import { Navigate } from 'react-router-dom';

const MustNotBeLoggedInRoute = ({ children }) => {
  if (localStorage.getItem('user')) {
    return <Navigate to="/profile" />;
  }
  return children;
};

export default MustNotBeLoggedInRoute;
