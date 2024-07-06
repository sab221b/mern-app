interface SessionData {
    sessionId: string;
    roleId: string;
}

export const setData = ({ sessionId, roleId }: SessionData) => {
    sessionStorage.setItem("session-id", sessionId);
    localStorage.setItem("session-id", sessionId);
    sessionStorage.setItem("role-id", roleId);
    localStorage.setItem("role-id", roleId);
    return;
}

export const getData = () => {
    const sessionId = sessionStorage.getItem("session-id") || localStorage.getItem("session-id");
    const roleId = sessionStorage.getItem("role-id") || localStorage.getItem("role-id");
    return { sessionId, roleId };
}

export const removeData = () => {
    sessionStorage.removeItem("session-id");
    localStorage.removeItem("session-id");
    sessionStorage.removeItem("role-id");
    localStorage.removeItem("role-id");
    return;
}