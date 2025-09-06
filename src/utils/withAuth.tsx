import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent:any) => {
  const AuthComponent = (props:any) => {
    const router = useNavigate();

    const isAuthenticated = () => {
      if (localStorage.getItem("token")) {
        return true;
      }
      return false;
    };

    useEffect(() => {
      if (!isAuthenticated()) {
        router("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};

export default withAuth;