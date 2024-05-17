import { useNavigate } from "react-router-dom";
import Axios from "../../helpers/interceptor";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actions as userActions } from "../../store/reducers/userSlice";
import { Box, Button, Modal, Typography } from "@mui/material";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.app.user.userData);
  const [showLogoutModal, toggleLogoutModal] = useState(false);

  useEffect(() => {
    if (!userData) {
      getLoginUserInfo();
    }
  }, [userData]);

  const getLoginUserInfo = async () => {
    try {
      const resp = await Axios.get('/user/self');
      dispatch(userActions.setUserData(resp.data));
    } catch (error) {
      console.error("error fetching user from session", error);
    }
  };

  const logoutUser = async () => {
    try {
      const response: any = await Axios.get("/user/logout");
      sessionStorage.removeItem("session_id");
      localStorage.removeItem("session_id");
      toast.success(response.data.message, {
        onClose: () => (window.location.href = "/"),
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("login-error", error);
    }
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Navbar className="sticky-top" bg="light" expand="sm">
        <Container fluid={true}>
          <Nav.Link onClick={() => navigate("/")}>
            <Navbar.Brand>Pro2z</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/dashboard")}>Dashboard</Nav.Link>
              <Nav.Link onClick={() => navigate("/profile")}>My Profile</Nav.Link>
              <Nav.Link onClick={() => toggleLogoutModal(true)}>Sign out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* sign out modal  */}
      <Modal
        open={showLogoutModal}
        onClose={() => toggleLogoutModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign out
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure want to sign out ?
          </Typography>
          <Box className="mt-4">
            <Button sx={{ mr: 2 }} variant="contained" onClick={logoutUser}>Sign out</Button>
            <Button variant="outlined" onClick={() => toggleLogoutModal(false)}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default Header;
