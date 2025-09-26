import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styleinput  from "../styles/inputStyle.module.css";

// service
import { createProduct } from "../services/productServices.jsx";

const StorePage = () => {
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
      name: "",
      personContact: "",
      phoneContact: 0,
      address: "",
      municipality: "",
      state: "",
      zipCode: 0,
      coordinates: "",
    },
  });

  const createStore = async () => {
    var data = getValues();
    const validate = await trigger([
        "storeId", "name", "personContact", "phoneContact",
        "address", "municipality", "state", "zipCode",
        "coordinates"
    ]);

    if (!validate) {
      return;
    }
    var data = getValues();
    
    await axios.post("http://localhost:8080/api/store", data);
    alert("Se registro correctamente la tienda");
    reset();
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
        <h1>Agregar Tienda</h1>
        <label>Codigo de tienda</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("storeId", {
            required: "El código de tienda es requerido",
            maxLength: {
              value: 10,
              message: "El codigo de tienda debe contener máximo 10 caracteres",
            },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.storeId?.message}
        </p>

        <label>Nombre de la tienda</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("name", {
            required: "El nombre de tienda es requerido",
            maxLength: {
              value: 100,
              message: "El nombre debe contener máximo 100 caracteres",
            },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.codigoFabrica?.message}
        </p>

        <label>Persona de contacto</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("personContact", {
            required: "La persona de contacto es requido",
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.personContact?.message}
        </p>

        <label>Telefono de contacto</label>
        <input className={styleinput.estiloinput}
          type="number"
          {...register("phoneContact", {
            required: "El teléfono de contacto es requerido",
            maxLength: {
              value: 10,
              message: "El teléfono de contacto máximo 10 números",
            },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.phoneContact?.message}
        </p>

        <label>Dirección</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("address", {
            required: "La dirección es requerido",
            maxLength: {
              value: 200,
              message: "La direccion debe tener máximo 200 caracteres",
            },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.address?.message}
        </p>

        <label>Municipio</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("municipality", {
            required: "El municipio es requerido",
            maxLength: {
              value: 200,
              message: "El municipio debe tener máximo 200 caracteres",
            },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.municipality?.message}
        </p>

        <label>Estado</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("state", {
            required: "El estado es requerido",
            maxLength: {
              value: 50,
              message: "El estado debe tener máximo 50 caracteres",
            },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.state?.message}
        </p>

        <label>Codigo postal</label>
        <input className={styleinput.estiloinput}
          type="number"
          {...register("zipCode", {
            required: "El codigo postal es requerido",
            maxLength: {
              value: 5,
              message: "El codigo postal debe tener máximo 5 numeros",
            },
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.zipCode?.message}
        </p>

        <label>Coordenadas</label>
        <input className={styleinput.estiloinput}
          type="text"
          {...register("coordinates", {
            required: "Las coordenadas son requeridas",
          })}
        />
        <p style={{ color: "red", fontSize: "14px", margin: "5px 0" }}>
          {errors.coordinates?.message}
        </p>

        <button className={styleinput.estiloboton} onClick={ createStore }>Confirmar tienda</button>
      </div>
    </>
  );
};
export default StorePage;