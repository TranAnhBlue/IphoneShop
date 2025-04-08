import {
  Nav,
  Table,
  Container,
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Form,
  FormSelect,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import CategoryList from "./CategoryList";
import { FaCartPlus } from "react-icons/fa";
import unidecode from "unidecode"; // Import the package
import Banner from "./Banner";

function ProductList() {
  const { products, searchTerm, setSearchTerm, selectedCategory, addToCart } =
    useContext(ProductContext);
  const [filter, setFilter] = useState("");

  // Filter products based on category and search term
  const normalizeText = (text) => unidecode(text.toLowerCase());

  // Filter products based on category and normalized search term
  const filterProduct = products
    .filter((product) => {
      const matchCategory = selectedCategory
        ? product.cateId == selectedCategory
        : true;
      const normalizedProductName = normalizeText(product.name);
      const normalizedSearchTerm = normalizeText(searchTerm);
      const matchesSearch =
        normalizedProductName.includes(normalizedSearchTerm);

      return matchCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (filter === "low") {
        return a.price - b.price; // Sort by price, low to high
      }
      if (filter === "high") {
        return b.price - a.price; // Sort by price, high to low
      }
      return 0;
    });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Total pages calculation
  const totalPages = Math.ceil(filterProduct.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container fluid>
      <Row>
        <Banner />
      </Row>
      <Container className="mt-3">
      {/* Sidebar and Product List */}
      <Row sm={12}>
        {/* Sidebar */}
        <Col sm={12} md={2} style={{ marginTop: "66px" }}>
          <CategoryList />
        </Col>

        {/* Products */}
        <Col xs={12} md={10}>
          {/* Search Bar */}
          <Row
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <Col xs={10} md={6}>
              <Form className="position-relative">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="🔍 Search for products..."
                    style={{
                      border: "1px solid gray",
                      borderRadius: "30px",
                      padding: "10px 20px",
                      paddingLeft: "45px",
                      boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                    }}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <i
                    className="bi bi-search"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "15px",
                      transform: "translateY(-50%)",
                      color: "#6c757d",
                    }}
                  ></i>
                </Form.Group>
              </Form>
            </Col>
          </Row>

          <Row>
            <Row className="d-flex justify-content-end mb-2 ">
              <select
                onChange={(e) => setFilter(e.target.value)}
                className="w-25"
              >
                <option value="">Select Category</option>
                <option value="low">Low to high</option>
                <option value="high">High to low</option>
              </select>
            </Row>
            {currentProducts.map((product) => (
              <Col key={product.id} lg={3} sm={6}>
                <Card style={{ marginBottom: "2rem" }}>
                  <Card.Img
                    variant="top"
                    src={
                      product.image.startsWith("data:image") // Kiểm tra nếu là Base64
                        ? product.image // Nếu là Base64, sử dụng trực tiếp
                        : `./images/${product.image}` // Nếu là URL, sử dụng đường dẫn ảnh
                    }
                    style={{
                      height: "15rem",
                      width: "auto",
                      objectFit: "cover",
                    }}
                    alt={product.name}
                  />
                  <Card.Body
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Card.Title
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.name}
                    </Card.Title>
                    <Card.Text
                      style={{
                        height: "3rem", // Fixed height to maintain card size
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2, // Limits text to 2 lines
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Card.Text>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link
                        className="btn btn-primary"
                        to={`/product/${product.id}`}
                      >
                        Detail
                      </Link>
                      <Button
                        onClick={() => addToCart(product.id)}
                        className="btn-info ms-1"
                      >
                        <FaCartPlus />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          <Row>
            <Col className="d-flex justify-content-center">
              <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </Col>
          </Row>
        </Col>
      </Row>
      </Container>
    </Container>
  );
}

export default ProductList;
