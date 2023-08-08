import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/button/button.component";
import Container from "../components/container/container.component";
import FormInput from "../components/inputs/input.component";
import { login } from "../data/actions";
import Loader from "../components/loader/Loader";
import logo from "../assets/logo.png";
const initialState = {
  email: "",
  password: "",
};

const validateData = (data) => {
  const { email, password } = data;
  const errors = {};

  if (!email) {
    errors.email = "Email requerido";
  }

  if (!password) {
    errors.password = "Contraseña requerida";
  }

  return errors;
};

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const { email, password } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...data, [name]: value };

    setData(newData);
    setErrors(validateData(newData));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (isAuth && user) {
    const { role } = user;

    if (role === 0) return <Navigate to="/" />;
    if (role === 1) return <Navigate to="/dashboard/admin/products" />;
  }

  return (
    <div className="container-center">
      <div className="container row bg-light grid-login rounded-15">
        <div className="col-md-auto">
          <img src={logo} alt=" " className="img_login" />
        </div>
        <div className="col p-5">
          <form className="" onSubmit={onSubmit}>
            <h2 className="form-label">Login</h2>
            <FormInput
              title="Email"
              placeholder="alguien@example.com"
              name="email"
              value={email}
              handleChange={handleChange}
              type="email"
              moreClass={["h5", "mb-4"]}
            />
            {errors.email && (
              <span className="badge bg-danger">{errors.email}</span>
            )}
            <FormInput
              title="Password"
              placeholder="*********"
              name="password"
              value={password}
              handleChange={handleChange}
              type="password"
              moreClass={["h5", "mb-4"]}
            />
            {errors.password && (
              <span className="badge bg-danger">{errors.password}</span>
            )}
            <div className="text-start form-check">
              <input
                type="checkbox"
                name="connected"
                id=""
                className="form-check-input"
              />
              <label htmlFor="connectec" className="form-check-label">
                Mantenerse conectado
              </label>
            </div>
            {isLoading && <Loader />}
            {!isLoading && (
              <Button
                title="Ingresar"
                moreStyle="btn bg-primary text-white w-full mb-3"
                type="submit"
                moreStyle="mt-4 mb-4"
              />
            )}
            <div>
              <Button
                isButton={false}
                title="Aún no tienes una cuenta? Registrar"
                href="/register"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
