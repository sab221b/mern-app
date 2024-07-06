import { useSelector } from "react-redux";
import PostLoginRoutes from "../routes/PostLoginRoutes";
import PreLoginRoutes from "../routes/PreLoginRoutes";
import Header from "../components/header/Header";
import { getData } from "./storage";

const CheckSession = () => {
    const sessionID = useSelector((state: any) => {
        const sessionId = state.app.user.sessionId;
        return sessionId || getData().sessionId;
    });
    const userData = useSelector((state: any) => state.app.user.userData);
    const userRole = userData?.role;

    return (
        sessionID?.length > 0 ?
            <>
                <Header />
                <div className={userRole?.key === 'agent' ? 'agent-bg' : 'main-bg'}>
                    <PostLoginRoutes />
                </div>
            </> : <PreLoginRoutes />
    )

}

export default CheckSession;