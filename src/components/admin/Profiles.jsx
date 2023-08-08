import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BASEURL } from "../../assets/constants";
import { getAllUsers } from "../../data/actions";
import getHeaderToken from "../../helpers/getHeaderToken";
import Loader from "../loader/Loader";

export const Profiles = () => {
  const accounts = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleBlockUser = async (id) => {
    try {
      await axios.put(`${BASEURL}/user/block/${id}`, null, getHeaderToken());
      toast.success("Usuario bloqueado");
      dispatch(getAllUsers());
    } catch (error) {
      toast.error("No se ha podido bloquear al usuario");
      console.log(error.response.data);
    }
  };

  const handleUnlockUser = async (id) => {
    try {
      await axios.put(`${BASEURL}/user/unlock/${id}`, null, getHeaderToken());
      toast.success("Usuario desbloqueado");
      dispatch(getAllUsers());
    } catch (error) {
      toast.error("No se ha podido desbloquear al usuario");
      console.log(error.response.data);
    }
  };

  return (
    <div className="container-center">
      <div className="container">
        {accounts ? (
          <div className="bg-light rounded">
            <span className="h4">Administradores</span>
            <table className="table table-striped table-hover table-bordered mb-3 align-middle">
              <thead>
                <tr className="table-light">
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {accounts.filter((e) => e.role === 1).length &&
                  accounts
                    .filter((e) => e.role === 1)
                    .map((account) => (
                      <tr key={account._id}>
                        <td>{account._id.substring(7, 14)}</td>
                        <td>{account.name}</td>
                        <td>{account.lastname}</td>
                        <td>{account.email}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
            <div className="border-top border-3 border-dark mb-2"></div>
            <span className="h4">Usuarios</span>
            {accounts && (
              <table className="table table-striped table-bordered ">
                <thead>
                  <tr className="table-light">
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.filter((e) => e.role === 0).length ? (
                    accounts
                      .filter((e) => e.role === 0)
                      .map((account) => (
                        <tr key={account._id}>
                          <td>{account._id.substring(7, 14)}</td>
                          <td>{account.name}</td>
                          <td>{account.lastname}</td>
                          <td>{account.email}</td>
                          <td>
                            <button
                              className="btn bg-danger me-2"
                              onClick={() => handleBlockUser(account._id)}
                            >
                              Bloquear
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={"5"}>
                        Aún no se ha registrado ningún usuario
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
            <div className="border-top border-3 border-dark mb-2"></div>
            <span className="h4">Usuarios bloqueados</span>
            {accounts && (
              <table className="table table-striped table-bordered ">
                <thead>
                  <tr className="table-light">
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.filter((e) => e.role === 3).length ? (
                    accounts
                      .filter((e) => e.role === 3)
                      .map((account) => (
                        <tr key={account._id}>
                          <td>{account._id.substring(7, 14)}</td>
                          <td>{account.name}</td>
                          <td>{account.lastname}</td>
                          <td>{account.email}</td>
                          <td>
                            <button
                              className="btn bg-success me-2"
                              onClick={() => handleUnlockUser(account._id)}
                            >
                              Desbloquear
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={"5"}>
                        Aún no ha bloqueado a ningún usuario
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
