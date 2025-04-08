import React, { useContext, useState } from "react";
import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
import { BiCart } from "react-icons/bi"; // Import icon for cart
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { SiSchneiderelectric } from "react-icons/si";
import { AuthenContext } from "../context/AuthenContext";

export default function Header() {
  const { cart } = useContext(ProductContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout, loginButton, currentUser } = useContext(AuthenContext); // Get logout function from AuthenContext

  // Check if the currentUser is an admin
  const isAdmin = currentUser?.role === "admin";

  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand className="fw-bold text-primary">
          <i className="bi bi-heart-fill me-2">
            <SiSchneiderelectric />
          </i>
          {isAdmin ? (
            <Link
              className=""
              style={{ textDecoration: "none", color: "inherit" }}
            >
              ElecStore Administrator
            </Link>
          ) : (
            <Link
              className=""
              style={{ textDecoration: "none", color: "inherit" }}
              to={"/"}
            >
              ElecStore
            </Link>
          )}
        </Navbar.Brand>

        {/* Nút Toggle cho Mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {!isAdmin && (
            <Nav className="me-auto">
              <Nav.Link href="#home" className="nav-item-custom">
                <i className="bi bi-house-door me-1"></i>Product
              </Nav.Link>
              <Nav.Link href="#features" className="nav-item-custom">
                <i className="bi bi-gear me-1"></i>News
              </Nav.Link>
              <Nav.Link href="#About" className="nav-item-custom">
                <i className="bi bi-wallet2 me-1"></i>About
              </Nav.Link>
            </Nav>
          )}

          {/* Biểu tượng Giỏ hàng */}
          {!isAdmin && (
            <Nav className="d-flex align-items-center">
              <Button
                variant="outline-primary"
                className="d-flex align-items-center position-relative"
              >
                <BiCart size={20} className="me-1" />
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/cart`}
                >
                  My Cart
                </Link>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.75rem" }}
                >
                  {cart.length}
                </span>
              </Button>
            </Nav>
          )}

          <Nav activeKey="/link" className="mx-3">
            <Nav.Link className="nav-item-custom d-flex align-content-center">
              <i className="bi bi-gear me-1"></i>
              {loginButton ? (
                <Dropdown align="end" className="dropdown-custom">
                  <Dropdown.Toggle
                    id="user-dropdown"
                    variant="light"
                    className="d-flex align-items-center border rounded-pill p-1"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <span className="me-1">
                      {currentUser?.firstName || "User"}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ transformOrigin: "top right" }}>
                    <Dropdown.Item href="/profile">View Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`/login`}
                >
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
