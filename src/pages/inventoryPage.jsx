import axios from "axios";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styleinput  from "../styles/inputStyle.module.css";

// service
import { getStores } from "../services/storeService";
import { getProducts } from "../services/productServices";

const InventoryPage = () => {
    const [storeList, setStoreList] = useState([]);
    const [productList, setProductList] = useState([]);

  const navigate = useNavigate();

  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      storeId: "",
      codigoFabrica: "",
      price: 0,
      cost: 0,
      stock: 0,
      minStock: 0,
      maxStock: 0,
      isActive: true
    },
  });

  const createInventory = async () => {
    var data = getValues();
    const validate = await trigger([
        "storeId", "codigoFabrica", "price",
        "cost", "stock", "minStock", "maxStock", "isActive"
    ]);

    if (!validate) {
      return;
    }
    var data = getValues();
    console.log(data);
    
    await axios.post("http://localhost:8080/api/inventory", data);
    alert("Se registro correctamente el inventario");
    reset();
  };

  useEffect(() => {
    // cambiar esta consulta al change del select de tiendas(stores)
    const loadStores = async () => {
          const data = await getStores();
          setStoreList(data);
        };
        loadStores();
        const loadProducts = async () => {
          const data = await getProducts();
          setProductList(data);
        };
        loadProducts();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h1>Agregar Inventario</h1>
        <label>Tienda</label>
        <select className={styleinput.estiloinput}
                id="stores" name="stores"
           {...register("storeId", {
            required: "La tienda es requerida"
          })}
        >
          {storeList.map((sale, index) => (
            <option key={index} value={sale.storeId}>
              {sale.name}
            </option>
          ))}
        </select>
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.idStore?.message}
        </p>

        <label>Producto</label>
        <select className={styleinput.estiloinput}
                id="product" name="product"
           {...register("codigoFabrica", {
            required: "El producto es requerido"
          })}
        >
          {productList.map((product, index) => (
            <option key={index} value={product.codigoFabrica}>
              {product.nombreProducto}
            </option>
          ))}
        </select>
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.codigoFabrica?.message}
        </p>

        <label>Precio venta</label>
        <input className={styleinput.estiloinput}
          type="number"
          {...register("price", {
            required: "El precio es requerido",
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.price?.message}
        </p>

        <label>Costo</label>
        <input className={styleinput.estiloinput}
          type="number"
          {...register("cost", {
            required: "El costo es requerido",
            // minLength: { value: 8, message: "Minimo de caractres es 8" },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.cost?.message}
        </p>

        <label>Número de piezas</label>
        <input className={styleinput.estiloinput}
          type="number"
          {...register("stock", {
            required: "El inventario es requerido"
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.stock?.message}
        </p>

        <label>Inventario mínimo</label>
        <input className={styleinput.estiloinput}
          type="number"
          {...register("minStock", {
            required: "El inventario mínimo es requerido"
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.minStock?.message}
        </p>

        <label>Inventario maximo</label>
        <input className={styleinput.estiloinput}
          type="number"
          {...register("maxStock", {
            required: "El inventario maximo es requerido"
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.maxStock?.message}
        </p>

        <label>¿Esta activo el producto?</label>
         <select id="isActive" name="isActive"
           {...register("isActive", {
            required: "Es necesarios saber si el producto esta activo o no"
          })}
        >
            <option value="true">Producto activo</option>
            <option value="true">Producto inactivo</option>
        </select>
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.isActive?.message}
        </p>

        <button className={styleinput.estiloboton} onClick={createInventory}>Confirmar inventario</button>
      </div>
    </>
  );
};
export default InventoryPage;