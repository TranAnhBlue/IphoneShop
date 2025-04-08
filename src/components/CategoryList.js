import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { Card, ListGroup } from "react-bootstrap";
import { IoIosMenu } from "react-icons/io";
import { RiFridgeLine } from "react-icons/ri";
import { GrCloudSoftware, GrTechnology } from "react-icons/gr";




export default function CategoryList() {
  const { categories, selectedCategory, setSelectedCategory } =
    useContext(ProductContext);

  return (
    <Card>
      <ListGroup className="department-list">
        <ListGroup.Item
          action
          onClick={() => setSelectedCategory(null)}
          className="d-flex align-items-center"
        >
          <IoIosMenu  className="me-2" /> All Category
        </ListGroup.Item>
        {categories.map((category) => (
          <ListGroup.Item
            key={category.id}
            action
            onClick={() => setSelectedCategory(category.id)}
            className="d-flex align-items-center"
          >
            {category.id === 1 && <RiFridgeLine className="me-2" />}
            {category.id === 2 && <GrTechnology  className="me-2" />}
            {category.id === 3 && <GrCloudSoftware  className="me-2" />}
            {category.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
