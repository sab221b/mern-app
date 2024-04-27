import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../pages/header/Header";
import PostLoginRoutes from "../routes/PostLoginRoutes";
import PreLoginRoutes from "../routes/PreLoginRoutes";

const CheckSession = () => {
    let sessionID = useSelector((state: any) => {
        const sessionId = state.app.user.sessionId;
        return sessionId || sessionStorage.getItem("session_id") || '';
    });

    return (
        sessionID?.length > 0 ?
            <>
                <Header />
                <PostLoginRoutes />
            </> :
            <PreLoginRoutes />
    )

}

export default CheckSession;