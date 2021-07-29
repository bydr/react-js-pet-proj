import axios from "axios";

//создаем отдельный экземпляр axios
// пр. для работы с разными версиями api
export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "52ad0c8f-699d-4bff-950c-203e48cb3000"
    }
});

export enum EnResultCodes {
    Success = 0,
    Error = 1
}

export enum EnResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

