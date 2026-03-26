import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WithAuth(WrapperComponent) {
  const AuthComponent = (props) => {
    const route = useNavigate();

    const isAuth = () => {
      const token = localStorage.getItem("token");
      const exp = localStorage.getItem("exp");

      if (!token || !exp) {
        return false;
      } else {
        if (Number(exp) < Date.now()) {
          return false;
        }
        return true;
      }
    };

    useEffect(() => {
      if (!isAuth()) {
        route("/auth");
      }
    }, []);

    return <WrapperComponent {...props}></WrapperComponent>;
  };

  return AuthComponent;
}
