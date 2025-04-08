import React from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ProductProvider from "./context/ProductContext";
import CategoryList from "./components/CategoryList";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Admin from "./components/Admin";
import { AuthenProvider } from "./context/AuthenContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProductTable from "./components/AdminProductTable";
import ProductEdit from "./components/ProductEdit";
import ProductAdd from "./components/ProductAdd";
import AdminHeader from "./components/AdminHeader";
import Banner from "./components/Banner";
import CheckoutPage from "./components/CheckoutPage";

function App() {
  // const role = localStorage.getItem("role");

  // const renderContent = () => {
  //   console.log("LOCAL : " + role);

  //   switch (role) {
  //     case "admin":
  //         return <AdminHeader />;
  //     case "user":
  //       return <Header/>
  //     default:
  //       return <Header/>
  //       break;
  //   }
  // }

  return (
    <ProductProvider>
      <BrowserRouter>
        <AuthenProvider>
          <Container fluid>
            <Row>
              <Header />
            </Row>
            <Row>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product" element={<CategoryList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route
                  path="/product/:id/edit"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}> 
                      <ProductEdit />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/product/add"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <ProductAdd />
                    </ProtectedRoute>
                  }
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route element={<AdminProductTable />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <Admin />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/cart/verifyOrder"
                  element={
                    <ProtectedRoute allowedRoles={["user"]}>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Row>
          </Container>
        </AuthenProvider>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
