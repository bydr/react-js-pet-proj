import {EnResultCodes, EnResultCodesForCaptcha, instance} from "./api";
import {TResponse} from "../types/types";

type TMeResponse = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: EnResultCodes,
    messages: Array<string>
};
type TLoginResponse = {
    data: {
        userId: number,
    },
    resultCode: EnResultCodes | EnResultCodesForCaptcha,
    messages: Array<string>
};


export const authAPI = {
    me() {
        return instance.get<TMeResponse>(`auth/me`)
            .then(res => res.data);
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string) {
        return instance.post<TLoginResponse>(`auth/login`, { email, password, rememberMe, captcha })
            .then(res => res.data)
    },
    logout() {
        return instance.delete<TResponse>(`auth/login`)
            .then(res => res.data)
    }
};
