import axios from "axios";

//создаем отдельный экземпляр axios
// пр. для работы с разными версиями api
export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "06ebda13-1991-460c-a2d8-c1e4abf65033"
    }
});

export enum EnResultCodes {
    Success = 0,
    Error = 1
}

export enum EnResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

