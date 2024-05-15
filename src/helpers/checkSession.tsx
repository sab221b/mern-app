import { useEffect } from "react";
import { useSelector } from "react-redux";
import PostLoginRoutes from "../routes/PostLoginRoutes";
import PreLoginRoutes from "../routes/PreLoginRoutes";
import Header from "../components/header/Header";

const CheckSession = () => {
    let sessionID = useSelector((state: any) => {
        const sessionId = state.app.user.sessionId;
        return sessionId || sessionStorage.getItem("session_id") || localStorage.getItem("session_id") || '';
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