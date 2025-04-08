import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { AuthenContext } from "../context/AuthenContext";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api/api";

const CheckoutPage = () => {
  const { cart, productInCart, quantities, setCart, orders, setOrders } = useContext(ProductContext);
  const { currentUser } = useContext(AuthenContext);
  const navigate = useNavigate();

  if (!currentUser) {
    return <p>Please log in to proceed with the checkout.</p>;
  }

  const totalAmount = productInCart.length > 0
  ? productInCart.reduce((acc, product) => {
      const quantity = quantities[product.id] || 1; 
      return acc + product.price * quantity;
    }, 0)
  : 0;

  const vat = totalAmount * 0.1;
  const totalWithVAT = totalAmount + vat;

  const handlePlaceOrder = async () => {
    var dt = new Date();
    const order = {
      id: `${orders.length + 1}`,
      orderDate: dt.getDate() + "-" + dt.getMonth() + "-" + dt.getFullYear(),
      customer: {
        customerId: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address,
        phone: currentUser.phone,
        email: currentUser.email,
      },
      products: productInCart.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantities[product.id] || 1,
      })),
    };
    try {
        const result =  await axios.post(`${BASE_URL}/orders`, order)

        console.log("Status : " +  result.status);
        console.log("Order placed:", order);

        setOrders([...orders, order])
        setCart([]);
        alert("Order placed successfully!");
        navigate("/");
    } catch (error) {
        console.log();
        
    }

    
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Checkout</h2>
          <p>Welcome, {currentUser.firstName}!</p>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {productInCart.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price.toLocaleString()} VND</td>
                <td>{quantities[product.id] || 1}</td>
                <td>{((quantities[product.id] || 1) * product.price).toLocaleString()} VND</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row>
        <Col>
          <p><strong>Total:</strong> {totalAmount.toLocaleString()} VND</p>
          <p><strong>VAT:</strong> {vat.toLocaleString()} VND</p>
          <p><strong>Total with VAT:</strong> {totalWithVAT.toLocaleString()} VND</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={handlePlaceOrder} variant="success">
            Place Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
