import axios from "axios";
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styleinput  from "../styles/inputStyle.module.css";

// service
import { getStores } from "../services/storeService";
import { getProducts } from "../services/productServices";

const SalesPage = () => {
  const navigate = useNavigate();
  const [storeList, setStoreList] = useState([]);
  const [productList, setProductList] = useState([]);

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
      quantity: 0,
    },
  });

  const createSales = async () => {
    var data = getValues();
    const validate = await trigger([
        "storeId", "productId", "quantity"
    ]);

    // if (data.confirmPassword !== data.password) {
    //   alert("El password y la confirmacion de password son diferentes");
    //   return;
    // }

    if (!validate) {
      return;
    }
    var data = getValues();
    console.log(data);
    
    await axios.post("http://localhost:8080/api/sale", data);
    alert("Se registro correctamente el producto");
    reset();
  };

  useEffect(() => {

    // cambiar esta consulta al change del select de tiendas(stores) y productos(products)
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
        <h1>Ventas</h1>
        <label>Tienda</label>
        <select id="stores" name="stores"
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

        <label>Producto</label>
        <select id="product" name="product"
           {...register("codigoFabrica", {
            required: "El producto es requerido"
          })}
        >
          {productList.map((product, index) => (
            <option key={index} value={product._id}>
              {product.nombreProducto}
            </option>
          ))}
        </select>

        <label>Cantidad de piezas</label>
        <input className={styleinput.estiloinput}
          type="number"
          {...register("quantity", {
            required: "El número de piezas es requerido",
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.noPiezas?.message}
        </p>
        
        <button className={styleinput.estiloboton} onClick={createSales}>Confirmar venta</button>
      </div>
    </>
  );
};
export default SalesPage;