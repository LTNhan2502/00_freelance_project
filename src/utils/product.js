import instance from "./axios.config";

import instance from './axios.config.js'

const getAllProduct = () => {
   const URL_API = "/v1/api/product";
   return instance.get(URL_API);
}

export { getAllProduct }

