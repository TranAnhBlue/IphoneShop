import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../api/api";

export default function ProductEdit() {
  const { id } = useParams(); // Lấy id sản phẩm từ URL
  const { products, setProducts, categories } = useContext(ProductContext); // Lấy danh sách sản phẩm và hàm cập nhật sản phẩm từ context
  const navigate = useNavigate();

  // Tìm sản phẩm cần chỉnh sửa dựa vào id
  const productToEdit = products.find((product) => product.id === id);

  // State lưu trữ thông tin sản phẩm đang chỉnh sửa
  const [product, setProduct] = useState({
    name: "",
    cateId: "",
    price: "",
    quantity: "",
    description: "",
    status: false,
    image: "",
  });

  // Đổ dữ liệu sản phẩm vào form khi component được render
  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  // Hàm xử lý thay đổi giá trị trong form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Lấy file từ event
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result }); // Lưu ảnh dưới dạng Base64
      };

      //   console.log("KAKA " + Object.values(product));

      reader.readAsDataURL(file);
    }
  };

  // Hàm xử lý lưu dữ liệu
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${BASE_URL}/products/${id}`, {
        ...product,
        cateId: Number(product.cateId),
        price: Number(product.price),
        quantity: Number(product.quantity),
      });
      setProducts(
        products.map((p) => (p.id === parseInt(id) ? response.data : p))
      );
      navigate("/admin");
      window.location.reload();
      //   console.log("STA " + response.status);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update the product. Please try again.");
    }
  };

  // Nếu không tìm thấy sản phẩm (id không hợp lệ)
  if (!productToEdit) {
    return <h2>Product not found!</h2>;
  }

  return (
    <Container className="mt-4">
      <h2>Edit Product</h2>
      <Form onSubmit={handleSave}>
        {/* Name */}
        <Form.Group className="mb-3" controlId="formProductName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Category ID */}
        <Form.Group className="mb-3" controlId="formProductCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="cateId"
            value={product.cateId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Price */}
        <Form.Group className="mb-3" controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Quantity */}
        <Form.Group className="mb-3" controlId="formProductQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3" controlId="formProductDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Status */}
        <Form.Group className="mb-3" controlId="formProductStatus">
          <Form.Check
            type="checkbox"
            label="Active"
            name="status"
            checked={product.status}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Image Upload */}
        <Form.Group className="mb-3" controlId="formProductImage">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

        <Button className="me-1" variant="primary" type="submit">
          Save Changes
        </Button>
        <Link
          className="btn btn-secondary me-1"
          style={{ textDecoration: "none", color: "white" }}
          to={`/admin`}
        >
          Cancel
        </Link>
      </Form>
    </Container>
  );
}
