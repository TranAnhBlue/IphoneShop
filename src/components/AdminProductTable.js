import { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import {
  Button,
  Pagination,
  Row,
  Table,
  Container,
  Col,
  Form,
} from "react-bootstrap";
import axios from "axios";
import BASE_URL from "./../api/api";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import CategoryList from "./CategoryList";
import unidecode from "unidecode";

export default function AdminProductTable() {
  const { products, setProducts, searchTerm, setSearchTerm, selectedCategory } =
    useContext(ProductContext);
  const [filter, setFilter] = useState("");

  const normalizeText = (text) => unidecode(text.toLowerCase());

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
        return a.price - b.price; 
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

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete product?")) {
      try {
        const result = await axios.delete(`${BASE_URL}/products/${id}`);
        console.log("DELETE: " + result.status);
        setProducts(products.filter((product) => product.id != id));
        window.location.reload();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <Container fluid>
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
        <Col md={6} className="d-flex justify-content-end">
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="form-select form-select-sm w-50"
          >
            <option value="">Filter</option>
            <option value="low">Low to high</option>
            <option value="high">High to low</option>
          </select>
        </Col>
      </Row>

      <Row className="my-1">
        <Col className="d-flex justify-content-end">
          <Link
            className="btn btn-success me-1 d-flex align-content-center"
            style={{ textDecoration: "none", color: "white" }}
            to={`/product/add`}
          >
            <FaPlus className="mt-1" />
            Add
          </Link>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={2}>
          <CategoryList />
        </Col>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product) => (
                <tr key={product.id} style={{ textAlign: "center" }}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>
                    {product.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                  </td>
                  <td>
                    {product.image.startsWith("data:image") ? (
                      <img
                        src={product.image} // Nếu là Base64, sử dụng trực tiếp
                        alt={product.name}
                        width="50"
                      />
                    ) : (
                      <img
                        src={`./images/${product.image}`} // Nếu là URL, sử dụng đường dẫn
                        alt={product.name}
                        width="50"
                      />
                    )}
                  </td>
                  <td>
                    <Link
                      className="btn btn-primary me-1"
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/product/${product.id}/edit`}
                    >
                      Edit
                    </Link>
                    <Button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="btn-danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
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
    </Container>
  );
}
