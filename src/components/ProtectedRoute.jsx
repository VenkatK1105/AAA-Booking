/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';


const ProtectedRoute = ({ children }) => {
 const { user, role } = useSelector((state) => state.auth);

  // if (!user) {
  //   return <Navigate to="/welcome" />;
  // }

  // if (role && user.role !== role) {
  //   return <Navigate to="/unauthorized" />;
  // }

  return children;
};

export default ProtectedRoute;
