import instance from "./axios.config";

const getAllProduct = () => {
   const URL_API = "/v1/api/product";
   return instance.get(URL_API);
}

// Lấy tất cả sản phẩm khôgn có userName
const getProductNoUsername = () => {
   const URL_API = "/v1/api/getProductNoUsername";

   return instance.get(URL_API);
}

const updateUsernameToProduct = (productId, userName) => {
   const URL_API = "/v1/api/updateUsernameToProduct";
   const data = { productId, userName }
   return instance.post(URL_API, data);
}

const getProductWaiting = (userName) => {
   const URL_API = "/v1/api/getProductWaiting";
   const data = { userName }
   return instance.post(URL_API, data);
}

const profitDistribution = (productId, userName, amount, profitNew) => {
   const URL_API = "/v1/api/profitDistribution";
   const data = { productId, userName, amount, profitNew }
   return instance.post(URL_API, data);
}

export { getAllProduct, getProductNoUsername, updateUsernameToProduct, getProductWaiting, profitDistribution }

