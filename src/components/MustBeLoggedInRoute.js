import { Navigate } from 'react-router-dom';

const MustBeLoggedInRoute = ({ children }) => {
  if (localStorage.getItem('user') === null) {
    return <Navigate to="/" />;
  }
  return children;
};

export default MustBeLoggedInRoute;
