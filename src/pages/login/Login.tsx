import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Axios from "../../helpers/interceptor";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Link,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions as userActions } from "../../store/reducers/userSlice";
import moment from "moment";

const Login = (props: any) => {
  const { formTitle, userData, onUpdate } = props;
  const formRef = useRef(null);
  const parentDivRef = useRef(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  type Status = "login" | "signup" | "profile";
  const [formname, setFormType] = useState<Status>(formTitle || "login");
  const [datepickerShow, setDatepickerShow] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    gender: "",
    date_of_birth: moment(),
  });

  const handleChange = (event: any) => {
    if (event._isAMomentObject) {
      setFormData({ ...formData, date_of_birth: event });
      return;
    }
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const { email, password, firstname, lastname, gender, date_of_birth } =
        formData;
      const profile = {
        firstname,
        lastname,
        gender,
        date_of_birth: date_of_birth.toISOString(),
      };
      let payload;
      switch (formname) {
        case "login":
          payload = { email, password };
          break;
        case "signup":
          payload = { email, password, profile };
          break;
        case "profile":
          payload = { profile };
          break;
      }
      const resp: any = await Axios.post(`/user/${formname}`, payload);
      let toastMessage = "";
      if (formname === "login" || formname === "signup") {
        const session_id = resp.headers.get("session-id");
        sessionStorage.setItem("session_id", session_id);
        localStorage.setItem("session_id", session_id);
        dispatch(userActions.setSessionId(session_id));
        toastMessage = `Welcome ${resp.data.profile.firstname} ${resp.data.profile.lastname}`;
      } else if (formname === "profile") {
        toastMessage = "Profile Updated!";
      }
      dispatch(userActions.setUserData(resp.data));
      toast.success(toastMessage, {
        onClose: () => navigate("/"),
      });
    } catch (error: any) {
      toast.error(error.response.message || error.response.data.message);
      console.log("login-error", error);
    }
  };

  useEffect(() => {
    if (userData) {
      const { firstname, lastname, gender, date_of_birth } = userData?.profile;
      setFormData({
        ...formData,
        firstname,
        lastname,
        gender,
        date_of_birth: moment(date_of_birth),
        email: userData.email,
      });
    }
  }, [userData]);

  return (
    <div
      ref={parentDivRef}
      className={`center-center flex-column loginWrapper ${
        formname === "profile" && "bg-info"
      }`}
      style={datepickerShow ? { minHeight: 900 } : {}}
    >
      <Typography variant="h4" textTransform={"capitalize"} gutterBottom>
        {formname}
      </Typography>
      <Form
        className="border border-success p-4 bg-white rounded-3"
        ref={formRef}
        onSubmit={onSubmit}
      >
        <div
          className="form-grid"
          style={
            formname === "login"
              ? { gridTemplateColumns: "repeat(1, 1fr)" }
              : {}
          }
        >
          {(formname === "signup" || formname === "profile") && (
            <>
              <FormControl className="form-field">
                <TextField
                  type="text"
                  name="firstname"
                  label="Firstname"
                  variant="outlined"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl className="form-field">
                <TextField
                  type="text"
                  name="lastname"
                  label="Lastname"
                  variant="outlined"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </FormControl>
            </>
          )}
          {(formname === "login" || formname === "signup") && (
            <>
              <FormControl className="form-field">
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formname === "signup" && (
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                )}
              </FormControl>
              <FormControl className="form-field">
                <TextField
                  type="password"
                  name="password"
                  label="Password"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                />
              </FormControl>
            </>
          )}
          {(formname === "signup" || formname === "profile") && (
            <>
              <FormControl className="form-field">
                <InputLabel id="gender">Gender</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={formData.gender}
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"other"}>Other</MenuItem>
                </Select>
              </FormControl>
              <FormControl className="form-field">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    onOpen={() => setDatepickerShow(true)}
                    onClose={() => setDatepickerShow(false)}
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                </LocalizationProvider>
              </FormControl>
            </>
          )}
        </div>
        <div className="mt-4 text-center d-flex flex-column align-items-center">
          {(formname === "login" || formname === "signup") && (
            <>
              <Button type="submit" variant="contained" onClick={onSubmit}>
                {formname}
              </Button>
              <Link
                className="mt-2 cursor-pointer"
                underline="none"
                onClick={() =>
                  setFormType(formname === "login" ? "signup" : "login")
                }
              >
                {formname === "login" ? "Signup" : "Login"}
              </Link>
            </>
          )}
          {formname === "profile" && (
            <Button type="submit" variant="contained" onClick={onUpdate}>
              Update
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Login;
