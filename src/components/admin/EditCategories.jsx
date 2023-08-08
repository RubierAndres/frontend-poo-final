import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { BASEURL } from "../../assets/constants";
import getHeaderToken from "../../helpers/getHeaderToken";
import { getAllCategories, getAllProducts } from "../../data/actions";

const initialForm = {
  name: "",
};

export const EditCategories = () => {
  const categories = useSelector((state) => state.products.categories);
  const products = useSelector((state) => state.products.products);
  const [form, setForm] = useState(initialForm);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    let currentCategory = categories.find((e) => e.name === value);

    setForm({ name: value, id: currentCategory._id });
    setEdit(true);
  };

  const handleChangeInput = (e) => {
    const { value } = e.target;

    setForm({ ...form, name: value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${BASEURL}/category/${form.id}`, form, getHeaderToken());
      toast.success("Se ha actualizado la categoría");
      handleCleanFields(e);
      dispatch(getAllCategories());
      dispatch(getAllProducts());
    } catch (err) {
      toast.error("No se ha podido actualizar la categoría");
      console.log(err.response.data);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (products.filter((el) => el.category === form.id).length > 0) {
      toast.error("No puede eliminar categorías que contengan productos");
    } else {
      try {
        await axios.delete(`${BASEURL}/category/${form.id}`, getHeaderToken());
        toast.success("Se ha borrado la categoría");
        handleCleanFields(e);
        dispatch(getAllCategories());
        dispatch(getAllProducts());
      } catch (err) {
        toast.error("No se ha podido eliminar la categoría");
        console.log(err.response.data);
      }
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${BASEURL}/category`, form, getHeaderToken());
      toast.success("Se ha creado una nueva categoría");
      handleCleanFields(e);
      dispatch(getAllCategories());
    } catch (err) {
      toast.error("No se ha podido crear la nueva categoría");
      console.log(err.response.data);
    }
  };

  const handleCleanFields = (e) => {
    e.preventDefault();

    setForm(initialForm);
    setEdit(false);
  };

  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Editar Categorías
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <form action="">
                      <input
                        type="text"
                        value={form.name}
                        onChange={handleChangeInput}
                        name="category"
                      />
                      {edit ? (
                        <div className="d-inline-block">
                          <input
                            type="button"
                            value="Guardar"
                            className="btn btn-primary ms-4"
                            onClick={handleEdit}
                          />
                          <input
                            type="button"
                            value="Eliminar"
                            className="btn btn-info ms-4"
                            onClick={handleDelete}
                          />
                          <input
                            type="button"
                            value="Cancelar"
                            className="btn btn-danger ms-4"
                            onClick={handleCleanFields}
                          />
                        </div>
                      ) : (
                        <input
                          type="button"
                          value="Crear"
                          className="btn btn-success ms-4"
                          onClick={handleCreate}
                        />
                      )}
                    </form>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      name="name"
                      onChange={handleChange}
                    >
                      {categories.map((e) => (
                        <option key={e._id} value={e.name}>
                          {e.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
