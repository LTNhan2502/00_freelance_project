import instance from "./axios.config";

const createBank = ( nameBank, userBank,  numberBank, userId) => {
    const URL_API = "/v1/api/bank";
    const data = { nameBank, userBank,  numberBank, userId }
    return instance.post(URL_API, data);
}

const getBankByUserId = (userId) => {
    const URL_API = "/v1/api/getBankByUserId";
    const data = { userId }
    return instance.post(URL_API, data);
}

const reqWithdrawal = (userId, moneyOut) => {
    const URL_API = "/v1/api/reqWithdrawal";
    const data = { userId, moneyOut }
    return instance.post(URL_API, data);
}

export { createBank, getBankByUserId, reqWithdrawal }