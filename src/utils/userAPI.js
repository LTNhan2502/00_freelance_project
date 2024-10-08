import instance from "./axios.config";

const registerUser = (userName, numberPhone, password, referralCode) => {
   const URL_API = "/v1/api/register";
   const data = { userName, numberPhone, password, referralCode }
   return instance.post(URL_API, data);
}

const loginUser = (userName, password) => {
   const URL_API = "/v1/api/login";
   const data = { userName, password }
   return instance.post(URL_API, data);
}

const getOneUserByUsername = (userName) => {
   const URL_API = "v1/api/getOneUser";
   const data = { userName }
   return instance.post(URL_API, data);
}

const updateMemberToUser = (userName, memberId) => {
   const URL_API = "v1/api/update_member";
   const data = { userName, memberId }
   return instance.post(URL_API, data);
}


export { registerUser, loginUser, getOneUserByUsername, updateMemberToUser }