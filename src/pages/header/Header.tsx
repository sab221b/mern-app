import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "../../helpers/interceptor";
import { toast } from "react-toastify";

function Header() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

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

  return (
    <Navbar className="sticky-top" bg="light" expand="sm">
      <Container fluid={true}>
        <Nav.Link onClick={() => navigate("/")}>
          <Navbar.Brand>Products Pro</Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/user-list")}>Userlist</Nav.Link>
            <Nav.Link onClick={() => navigate("/profile")}>My Profile</Nav.Link>
            <Nav.Link onClick={logoutUser}>Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
