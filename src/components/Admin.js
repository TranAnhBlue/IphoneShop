import { Button, Col, Container, Row } from "react-bootstrap";
import AdminProductTable from "./AdminProductTable";
import { useState } from "react";
import AdminOrderTable from "./AdminOrderTable";

export default function Admin() {
  const [table, setTable] = useState("product");

  const handleChangeTable = (tableName) => {
    setTable(tableName);
  };

  const renderContent = () => {
    switch (table) {
      case "product":
        return <AdminProductTable />;
      case "order":
        return <AdminOrderTable />;
      default:
        return <div>Select a table</div>; // Đảm bảo có trường hợp mặc định
    }
  };

  return (
    <Container fluid>
      <Row className="mt-3">
        <Col md={2}>
          <div className="border shadow-lg p-3 mb-5 bg-white rounded min-vh-100">
            <div>MENU</div>
            <div className="my-1 d-flex justify-content-center">
              <Button onClick={() => handleChangeTable("product")} className="w-100">
                Product Management
              </Button>
            </div>
            <div className="my-1 d-flex justify-content-center">
              <Button onClick={() => handleChangeTable("order")} className="w-100">
                Order Management
              </Button>
            </div>
          </div>
        </Col>
        <Col md={10}>
          <div className="border shadow-lg p-3 mb-5 bg-white rounded min-vh-100">
            {renderContent()} {/* Đảm bảo hàm này được gọi đúng cách */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
