import { useContext, useEffect, useState } from "react";
import { Button, Image, Row, Col, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function Cart() {
  const { cart, setCart, products, productInCart, setProductInCart, quantities, setQuantities } =
    useContext(ProductContext);

  // Fetch products in cart, but only update state if there's a change
  useEffect(() => {
    const fetchProductsInCart = () => {
      const filteredProducts = products.filter((p) => cart.includes(p.id));
      // Set only if there is a change in the filtered products
      if (JSON.stringify(filteredProducts) !== JSON.stringify(productInCart)) {
        setProductInCart(filteredProducts);
      }
    };

    fetchProductsInCart();
  }, [cart, products, productInCart, setProductInCart]);

  useEffect(() => {
    const firstQuantities = {};
    productInCart.forEach((product) => {
      firstQuantities[product.id] = 1;
    });
    setQuantities(firstQuantities);
  }, [productInCart]);

  // Xử lý xoá toàn bộ giỏ hàng
  const handleDeleteCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]); // Chỉ xoá giỏ hàng nếu người dùng xác nhận
    }
  };

  const addQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1, // Nếu chưa có thì mặc định là 1, sau đó +1
    }));
  };

  const reduceQuantity = (id) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[id] || 1;
      return {
        ...prevQuantities,
        [id]: currentQuantity > 1 ? currentQuantity - 1 : 1, // Không giảm dưới 1
      };
    });
  };

  console.log("QTT: " + JSON.stringify(quantities));
  

  const totalAmount = productInCart.reduce((acc, product) => {
    const quantity = quantities[product.id] || 1;
    return acc + product.price * quantity;
  }, 0);

  // Tính VAT
  const vat = totalAmount * 0.1;

  // Tính tổng cộng với VAT
  const totalWithVAT = totalAmount + vat;

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Row>
        {/* Header Section */}
        <Col style={{ textAlign: "right" }} sm={12}>
          <Button onClick={handleDeleteCart} variant="danger" className="mb-3">
            Clear All
          </Button>
        </Col>

        {/* Table Section */}
        <Table striped bordered hover>
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {productInCart.map((product) => (
              <tr key={product.id} style={{ textAlign: "center" }}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <Image
                    height="40px"
                    width="auto"
                    src={`./images/${product.image}`}
                  />
                </td>
                <td>
                  <Button
                    onClick={() => addQuantity(product.id)}
                    variant="outline-primary"
                    className="me-1"
                  >
                    +
                  </Button>
                  <span>{quantities[product.id] || 1}</span>
                  <Button
                    onClick={() => reduceQuantity(product.id)}
                    variant="outline-primary"
                    className="ms-1"
                  >
                    -
                  </Button>
                </td>
                <td>{(quantities[product.id] || 1) * product.price} VND</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Summary Section */}
        <Col style={{ textAlign: "right" }} sm={12}>
          <p style={{ fontSize: "18px" }}>
            <strong>VAT:</strong> {vat.toLocaleString()} VND
          </p>
        </Col>
        <Col style={{ textAlign: "right" }} sm={12}>
          <p style={{ fontSize: "18px" }}>
            <strong>Total Amount:</strong> {totalAmount.toLocaleString()} VND
          </p>  
        </Col>
        <Col style={{ textAlign: "right" }} sm={12}>
          <p style={{ fontSize: "18px" }}>
            <strong>Total with VAT:</strong> {totalWithVAT.toLocaleString()} VND
          </p>
        </Col>

        {/* Footer Section */}
        <Col style={{ textAlign: "right" }}>
          <Link className="btn btn-secondary" to={"/"}>
            Back to homepage
          </Link>
          <Link className="btn btn-success ms-1" to={"/cart/verifyOrder"}>
            Check Out
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
