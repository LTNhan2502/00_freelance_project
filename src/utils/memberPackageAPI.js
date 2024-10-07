import instance from "../utils/axios.config";

const getAllMemberPackage = () => {
   const URL_API = "/v1/api/member";
   return instance.get(URL_API);
}

export { getAllMemberPackage }