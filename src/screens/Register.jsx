import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { connect, useDispatch } from "react-redux";
import Button from "../components/button/button.component";
import Container from "../components/container/container.component";
import FormInput from "../components/inputs/input.component";
import { register } from "../data/actions";
import Loader from "../components/loader/Loader";

const initialState = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
};

const Register = ({ isAuth, isLoading, user }) => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, lastname, email, password, confirmPassword, address } = form;

    if (password !== confirmPassword) {
      toast("La contraseña no coincide");
    } else {
      dispatch(register({ name, lastname, email, password, address }));
    }
  };

  if (isAuth && user) {
    const { name, role } = user;

    if (role === 0) return <Navigate to="/" />;
    if (role === 1) return <Navigate to="/dashboard/admin/products" />;
  }

  return (
    <Container>
      <div className="container-center">
        <form
          className=" container register-form bg-light rounded-15 p-5"
          onSubmit={onSubmit}
        >
          <h2 className="form-label">Register</h2>
          <FormInput
            title="Nombre"
            placeholder="Juan"
            name="name"
            value={form.name}
            handleChange={handleChange}
            type="text"
            moreClass={["h5", "mb-2"]}
          />
          <FormInput
            title="Apellido"
            placeholder="Perez"
            name="lastname"
            value={form.lastname}
            handleChange={handleChange}
            type="text"
            moreClass={["h5", "mb-2"]}
          />
          <FormInput
            title="Dirección"
            placeholder="Av. Occidental y Manuel Crespo"
            name="address"
            value={form.address}
            handleChange={handleChange}
            type="text"
            moreClass={["h5", "mb-2"]}
          />
          <FormInput
            title="Email"
            placeholder="alguien@example.com"
            name="email"
            value={form.email}
            handleChange={handleChange}
            type="email"
            moreClass={["h5", "mb-2"]}
          />
          <FormInput
            title="Contraseña"
            placeholder="*********"
            name="password"
            value={form.password}
            handleChange={handleChange}
            type="password"
            moreClass={["h5", "mb-2"]}
          />
          <FormInput
            title="Confirmar Contraseña"
            placeholder="*********"
            name="confirmPassword"
            value={form.confirmPassword}
            handleChange={handleChange}
            type="password"
            moreClass={["h5", "mb-2"]}
          />
          {isLoading && <Loader />}
          {!isLoading && (
            <Button
              title="Registrarse"
              moreStyle="bg-primary text-white w-full mb-3"
              type="submit"
              moreStyle="mt-4 mb-2"
            />
          )}
          <div>
            <Button
              isButton={false}
              title="Ya tienes una cuenta? Inicia sesión"
              href="/login"
            />
          </div>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  isLoading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Register);
