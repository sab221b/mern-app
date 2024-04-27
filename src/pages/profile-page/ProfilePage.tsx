import { useEffect } from "react";
import Login from "../login/Login";
import { useSelector } from "react-redux";

const profileWrapper = (WrappedComponent: any) => {
    // This component will wrap the original component
    const LoginWrapper = (props: any) => {
      let userData = useSelector((state: any) => state.app.user.userData);
      const newProps = {
        ...props,
        userData,
        formTitle: "profile"
      }
      return <WrappedComponent {...newProps} />;
    };
  
    // Return the HOC
    return LoginWrapper;
  };

const ProfilePage = profileWrapper(Login);

export default ProfilePage;