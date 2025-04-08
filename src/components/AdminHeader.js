import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { BiCart } from "react-icons/bi"; // Import icon for cart
import { Link } from 'react-router-dom';
import { ProductContext } from "../context/ProductContext";
import { SiSchneiderelectric } from "react-icons/si";
import { navigate } from 'axios';
import { AuthenContext } from "../context/AuthenContext";


export default function AdminHeader() {
  const {cart} = useContext(ProductContext)

  const { logout } = useContext(AuthenContext); // Get logout function from AuthenContext

  const handleLogout = () => {
    logout(); // Call the logout function to clear session and localStorage
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm py-3">
      <Container fluid>
        {/* Logo và Tên Thương Hiệu */}
        <Navbar.Brand className="fw-bold text-primary">
          <i className="bi bi-heart-fill me-2"><SiSchneiderelectric />
          </i>
          <Link className="" style={{textDecoration:"none", color:"inherit"}} to={"/"}>
            ElecStore Administrator
          </Link>
        </Navbar.Brand>

        {/* Nút Toggle cho Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Nội dung Navbar */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className="nav-item-custom">
              <i className="bi bi-house-door me-1"></i>
            </Nav.Link>
            <Nav.Link href="#features" className="nav-item-custom">
              <i className="bi bi-gear me-1"></i>
            </Nav.Link>
            <Nav.Link href="#features" className="nav-item-custom">
              <i className="bi bi-gear me-1"></i>
            </Nav.Link>
            <Nav.Link href="#About" className="nav-item-custom">
              <i className="bi bi-wallet2 me-1"></i>
            </Nav.Link>
          </Nav>

          {/* Biểu tượng Giỏ hàng */}
          <Nav className="">
            <Button variant="outline-primary" className="d-flex align-items-center position-relative">
              <BiCart size={20} className="me-1" />
              <Link style={{textDecoration:"none", color:"inherit"}} to={`/cart`}>My Cart</Link>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.75rem" }}
              >
                {cart.length}{/* Replace 3 with dynamic cart count */}
              </span>
            </Button>
          </Nav>

          <Nav activeKey="/link" className="ms-3">
            <Nav.Link className="nav-item-custom">
              <i className="bi bi-gear me-1"></i>
              {localStorage.getItem("role") ? (
                <>
                  <Button
                    onClick={handleLogout}
                    style={{ border: "none", background: "none", cursor: "pointer", textDecoration: "none", color: "inherit" }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                // Nếu không có role, hiển thị Login
                <Link style={{ textDecoration: "none", color: "inherit" }} to={`/login`}>
                  Login
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
