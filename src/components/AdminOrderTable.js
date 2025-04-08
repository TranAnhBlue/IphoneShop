import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";

const AdminOrderTable = () => {
  const {orders} = useContext(ProductContext)


  return (
    <div>
      <h2 className="mb-4">Order List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Required Date</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderDate}</td>
                <td>{order.requireDate}</td>
                <td>{order.customer.firstName} {order.customer.lastName}</td>
                <td>{order.customer.address}</td>
                <td>{order.customer.phone}</td>
                <td>{order.customer.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No orders available
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminOrderTable;
