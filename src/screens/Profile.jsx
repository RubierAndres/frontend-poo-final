import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/loader/Loader";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loadingAuth);

  return (
    <div className="container">
      {isLoading || !user ? (
        <Loader />
      ) : (
        <div className="mb-2">
          <h2>Mi perfil</h2>
          <div className="row">
            <div className="col md-auto">
              <img className="grid-img rounded-pill" src={user.avatar} alt="Profile" />
            </div>
            <div className="col">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <td colSpan={2}>
                      <h4>Datos personales</h4>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <h5 >Nombre:</h5>
                    </td>
                    <td>
                      <span>{user.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5 >Apellido:</h5>
                    </td>
                    <td>
                      <div>{user.lastname}</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h5 >Email:</h5>
                    </td>
                    <td>
                      <div>{user.email}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
