import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  orderProducts,
  setOptions,
} from "../../data/actions";
import { RESTART_FILTERS, RESTART_PRODUCTS } from "../../data/actions/types";
import { toast } from "react-toastify";
import { searchByName } from "../../data/actions";

const Filters = () => {
  const categories = useSelector((state) => state.products.categories);
  // options -> order, orderBy
  const options = useSelector((state) => state.products.options);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const handleChangeSearch = (e) => {
    const { value } = e.target;

    setSearch(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setSearch("");
      toast.info("Ingrese su búsqueda");
    } else {
      dispatch(searchByName(search));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    //  console.log(name + " " + value);

    dispatch(setOptions({ [name]: value }));
    if (name === "category") {
      if (value === "all") {
        dispatch({ type: RESTART_PRODUCTS });
      } else {
        dispatch(filterByCategory(value));
      }
    }
    dispatch(orderProducts());
  };

  const handleRestartFilters = (e) => {
    e.preventDefault();

    dispatch({ type: RESTART_FILTERS });
    dispatch({ type: RESTART_PRODUCTS });
    dispatch(orderProducts());
  };

  return (
    <div className="mt-3 container justify-content-center">
      <form className="d-flex" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={handleChangeSearch}
        />
        <button className="btn btn-success text-login" type="submit">
          Search
        </button>
      </form>
      <div className="align-items-center ms-3" style={{ margin: "1rem" }}>
        <label className="text-light">Ordenar:</label>
        <select
          title="orderBy"
          className="rounded p-1 ms-2 me-2"
          name={"orderBy"}
          id={"orderBy"}
          onChange={handleChange}
          value={options.orderBy}
        >
          <option value={"name"} key={"name"}>
            {"Nombre"}
          </option>
          <option value={"price"} key={"price"}>
            {"Precio"}
          </option>
        </select>
        <select
          title="order"
          name={"order"}
          id={"order"}
          className="rounded p-1 ms-2 me-2"
          onChange={handleChange}
          value={options.order}
        >
          <option value={"asc"} key={"asc"}>
            {"Ascendente"}
          </option>
          <option value={"desc"} key={"desc"}>
            {"Descendente"}
          </option>
        </select>
        <label className="text-light">Categorías:</label>
        <select
          className="rounded p-1 ms-2 me-2"
          name="category"
          onChange={handleChange}
          value={options.category}
        >
          <option value={"all"}>Todas</option>
          {categories.map((e) => (
            <option key={e._id} value={e._id}>
              {e.name}
            </option>
          ))}
        </select>
        <button onClick={handleRestartFilters} className="btn btn-secondary">
          Quitar filtros
        </button>
      </div>
    </div>
  );
};

export default Filters;
