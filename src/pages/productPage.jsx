import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styleinput  from "../styles/inputStyle.module.css";

// service
import { createProduct } from "../services/productServices.jsx";

const ProductsPage = () => {
  const navigate = useNavigate();

  const {
    register,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombreProducto: "",
      codigoFabrica: "",
    //   codigoUnico: "",
      description: "",
      marca: "",
      categoria: "",
      noPiezas: 0
    },
  });

  const createProduct = async () => {
    var data = getValues();
    const validate = await trigger([
        "codigoFabrica", "codigoUnico", "description", "marca",
        "categoria", "noPiezas"
    ]);

    // if (data.confirmPassword !== data.password) {
    //   alert("El password y la confirmacion de password son diferentes");
    //   return;
    // }

    if (!validate) {
      return;
    }
    var data = getValues();
    
    await axios.post("http://localhost:8080/api/product", data);
    // await axios.post("https://parking-taupe.vercel.app/register", data);
    // await axios.post("http://localhost:8080/register", data);
    alert("Se registro correctamente el producto");
    // navigate("/");
    reset();
    // onCloseModal();
  };

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
        <h1>Agregar Producto</h1>
        <label>Nombre producto</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("nombreProducto", {
            required: "El nombre de producto es requerido",
            maxLength: {
              value: 100,
            //   message: "El email debe contener máximo 100 caracteres",
            },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.codigoFabrica?.message}
        </p>
        <label>Código de fábrica</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("codigoFabrica", {
            required: "El código de fabrica es requerido",
            maxLength: {
              value: 100,
            //   message: "El email debe contener máximo 100 caracteres",
            },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.codigoFabrica?.message}
        </p>

        <label>Descripción</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("description", {
            required: "La descripción es requido",
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.description?.message}
        </p>

        <label>Marca</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("marca", {
            required: "La Marca es requerido",
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.marca?.message}
        </p>

        <label>Categoria</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("categoria", {
            required: "La Categoria es requerido",
            // minLength: { value: 8, message: "Minimo de caractres es 8" },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.categoria?.message}
        </p>

        {/* <label>Número de piezas</label>
        <input className={styleinput.estiloinput}
          type="number"
          {...register("noPiezas", {
            required: "El número de piezas es requerido"
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.noPiezas?.message}
        </p> */}

        <button className={styleinput.estiloboton} onClick={createProduct}>Confirmar producto</button>
      </div>
    </>
  );
};
export default ProductsPage;