import Login from "../login/Login";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../helpers/interceptor";
import { useEffect, useState } from "react";
import { actions as userActions } from "../../store/reducers/userSlice";
import { useParams } from "react-router-dom";

const profileWrapper = (WrappedComponent: any) => {
  // This component will wrap the original component
  const LoginWrapper = (props: any) => {
    const dispatch = useDispatch();
    let userData = useSelector((state: any) => state.app.user.userData);
    const [userInfo, setUserInfo] = useState(userData);
    const [roles, setRoles] = useState([]);
    const params = useParams();

    useEffect(() => {
      if (!userInfo && !params?.userID) {
        getLoginUserInfo();
      }
    }, [userInfo]);

    useEffect(() => {
      if (params?.userID) {
        getSelectedUserInfo(params?.userID);
        getRoles();
      }
    }, [params?.userID])

    const getLoginUserInfo = async () => {
      try {
        const resp = await Axios.get('/user/self');
        dispatch(userActions.setUserData(resp.data));
        setUserInfo(resp.data);
      } catch (error) {
        console.error("error fetching user from session", error);
      }
    };

    const getSelectedUserInfo = async (userID: string) => {
      try {
        const resp = await Axios.get(`/user/${userID}`);
        setUserInfo(resp.data);
      } catch (error) {
        console.error("error fetching user from session", error);
      }
    };

    const getRoles = async () => {
      try {
        const resp = await Axios.get('/roles');
        setRoles(resp.data);
      } catch (error) {
        console.error("error fetching roles", error);
      }
    }

    let newProps = {
      ...props,
      userData: userInfo,
      formTitle: "profile",
      roles,
      userID: params?.userID
    }
    return userInfo ? <WrappedComponent {...newProps} /> : null;
  };

  // Return the HOC
  return LoginWrapper;
};

const ProfilePage = profileWrapper(Login);

export default ProfilePage;