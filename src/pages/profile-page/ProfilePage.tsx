import Login from "../login/Login";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../helpers/interceptor";
import { useEffect, useState } from "react";
import { actions as userActions } from "../../store/reducers/userSlice";

const profileWrapper = (WrappedComponent: any) => {
  // This component will wrap the original component
  const LoginWrapper = (props: any) => {
    const dispatch = useDispatch();
    let userData = useSelector((state: any) => state.app.user.userData);
    const [userInfo, setUserInfo] = useState(userData);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await Axios.get('/user/self');
          dispatch(userActions.setUserData(resp.data));
          setUserInfo(resp.data);
        } catch (error) {
          console.error("error fetching user from session", error);
        }
      };
      if (!userInfo) fetchData();
    }, [userInfo]);

    let newProps = {
      ...props,
      userData: userInfo,
      formTitle: "profile"
    }
    return userInfo ? <WrappedComponent {...newProps} /> : null;
  };

  // Return the HOC
  return LoginWrapper;
};

const ProfilePage = profileWrapper(Login);

export default ProfilePage;