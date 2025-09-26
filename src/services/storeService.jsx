import axios from "axios";

const API_URL = "http://localhost:8080/api/store";

// Obtener todos las tiendas
export const getStores = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  
  return response.data;
};

// Crear un tienda
// export const createStore = async (store) => {
//   const response = await axios.post(API_URL, store);
//   return response.data;
// };