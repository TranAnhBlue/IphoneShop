import React, { useContext, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { AuthenContext } from "../context/AuthenContext";
import navigate from "axios"
import { useNavigate } from 'react-router-dom';
import BASE_URL from "../api/api";


export default function Login() {
    const {setIsAuthenticated, setCurrentUser, currentUser, setLoginButton } = useContext(AuthenContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const {login} = useContext(AuthenContext)
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const result = await axios.get(`${BASE_URL}/users?email=${email}&password=${password}`);
            //console.log("Fetched user: ", result.data);
    
            // const users = Array.isArray(result.data) ? result.data : [];
            //console.log("User : ", JSON.stringify(users)); 

            const user = result.data[0]
        
            if (user) {
                setCurrentUser(user)
                setIsAuthenticated(true)
                login(user.role)
                setLoginButton(true);
                navigate("/admin");
            } else {
                alert("Thông tin đăng nhập không hợp lệ");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };
    


  return (
    <Container>
      <Row className="justify-content-center mt-5" style={{ minHeight: "100vh" }}>
        <Col md={6} lg={4}>
          <div className="border rounded p-4 shadow-lg">
            <h3 className="text-center mb-4">Login</h3>
            <Form  onSubmit={handleLogin}>
              <Form.Group controlId="EmailS" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={(e) => (setEmail(e.target.value))} type="email" placeholder="Enter username" />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => (setPassword(e.target.value))} type="password" placeholder="Enter password" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <small>
                Don't have an account? <a href="/register">Register</a>
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
