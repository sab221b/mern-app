import axios from "axios";
import { ApiUrl } from "./constants";
import { toast } from "react-toastify";
// const axios = require('axios');

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const Axios = axios.create({
  baseURL: `${ApiUrl}/api`,
  // timeout: 15000,
});

// Step-2: Create request, response & error handlers
const requestHandler = (request: any) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  request.headers.session_id =
    sessionStorage.getItem("session_id") ||
    localStorage.getItem("session_id") || "";
  return request;
};

const responseHandler = (response: any) => {
  if (response.status === 401) {
    sessionStorage.removeItem("session_id");
    localStorage.removeItem("session_id");
    toast.error(response.data.message, {
      onClose: () => (window.location.href = "/"),
    });
  }
  return response;
};

const errorHandler = (error: any) => {
  sessionStorage.removeItem("session_id");
  localStorage.removeItem("session_id");
  toast.error(error.response.data.message, {
    onClose: () => (window.location.href = "/"),
  });
  return Promise.reject(error);
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
Axios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

Axios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

// Step-4: Export the newly created Axios instance to be used in different locations.
export default Axios;
