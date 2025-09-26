import axios from "axios";

const API_URL = "http://localhost:8080/api/product";

// Obtener todos los productos
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Crear un producto
export const createProduct = async (product) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};