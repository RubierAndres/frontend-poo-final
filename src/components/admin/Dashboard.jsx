import React from "react";
import ProductForm from "./ProductForm";
import { useSelector } from "react-redux";
import CardProductAdmin from "../products/Card.product.admin";
import { EditCategories } from "./EditCategories";
import Filters from "../filters/Filters";

const Dashboard = () => {
  const products = useSelector((state) => state.products.filtered);

  return (
    <div className="dashboard-Admin p-5 container-fluid">
      <div className="container-fluid">
        {/* EDITOR FORM */}
        <ProductForm />
        <div className="container-sm mt-4">
          <EditCategories />
        </div>
        <Filters />
        <div className="row">
          {products.length ? (
            products.map((product) => (
              <CardProductAdmin key={product._id} product={product} />
            ))
          ) : (
            <div>No hay productos</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
