import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../api/api";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import "../index.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  

  useEffect(() => {
    const getProductById = async () => {
      try {
        const result = await axios.get(`${BASE_URL}/products/${id}`);
        console.log("Product by Id : ", result.data);

        setProduct(result.data);
      } catch {
        console.log("Product not found");
      }
    };

    getProductById();
  }, []);

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        <Col xs={12} md={4}>
          {/* Card for image */}
          <Card className="shadow-sm border-0">
            <div className="image-container">
              <Card.Img
                variant="top"
                src={
                  product?.image && product?.image.startsWith("data:image") // Check if image is Base64
                    ? product?.image // Use the Base64 string directly
                    : `/images/${product?.image}` // If URL, use the URL path
                }
                className="img-fluid"
              />
            </div>
          </Card>
        </Col>
        <Col
          xs={12}
          md={6}
          className="d-flex flex-column justify-content-center"
        >
          {/* Card for details */}
          <Card className="shadow-sm border-0 p-4">
            <Row>
              <Col md={8}>
                <Card.Body>
                  <Card.Title className="text-primary fw-bold fs-3">
                    {product?.name || "Product Name"}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    <strong>Price:</strong> {product?.price || "N/A"} VND
                  </Card.Text>
                  <Card.Text className="text-muted">
                    <strong>Quantity:</strong> {product?.quantity || "N/A"}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    <strong>Description:</strong>{" "}
                    {product?.description || "N/A"}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    <strong>Create At:</strong> {product?.createAt || "N/A"}
                  </Card.Text>
                  <Card.Text className="text-muted">
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        product?.status ? "text-success" : "text-danger"
                      }
                    >
                      {product?.status ? "In stock" : "Out of stock"}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Col>
              <Col md={4}>
                <Button className="btn-info ms-1">Add to cart</Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
