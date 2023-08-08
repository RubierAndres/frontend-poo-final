import React, { useEffect, useState } from "react";
import Orders from "./Orders";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarUser = ({ handlePage }) => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.loadingAuth);

  useEffect(() => {
    if (!isAuth && !isLoading) navigate("/");
  }, [isAuth, navigate, isLoading]);

  return (
    <div className="d-flex btn-group mt-4 mb-4">
      <button className="btn btn-primary" onClick={(e) => handlePage("profile")}>
        Mi perfil
      </button>
      <button className="btn btn-success" onClick={(e) => handlePage("orders")}>
        Mis pedidos
      </button>
    </div>
  );
};

const User = () => {
  const [page, setPage] = useState("orders");

  return (
    <div className="container-center">
      <div className="container bg-light rounded-15">
        <NavbarUser handlePage={(page) => setPage(page)} />
        <div>{page === "profile" ? <Profile /> : <Orders />}</div>
      </div>
    </div>
  );
};

export default User;
