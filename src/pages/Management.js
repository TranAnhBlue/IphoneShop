import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import AdminDashboard from '../components/AdminDashboard';
import StaffDashboard from '../components/StaffDashboard';
import UserDashboard from '../components/UserDashboard';
import { AuthenContext } from '../context/AuthenContext';
import ProductList from '../components/ProductList';
import Admin from '../components/Admin';

const Management = () => {
  const { role } = useContext(AuthenContext);
  
  const renderContent = () => {
    switch(role) {
      case 'admin':
        return <Admin />;
      case 'user':
        return < ProductList/>;
      default:
        return <p>Vui lòng chọn quyền</p>;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default Management;
