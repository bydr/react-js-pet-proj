import axios, {AxiosResponse} from "axios";
import {UserType} from "../types/types";

//создаем отдельный экземпляр axios
// пр. для работы с разными версиями api
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "52ad0c8f-699d-4bff-950c-203e48cb3000"
    }
});

type TGetUsersResponse = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
};
export type TFollowResponse = {
    resultCode: EnResultCodes | number;
    messages: Array<string>,
    data: {}
};
export type TUnfollowResponse = {
    resultCode: EnResultCodes | number;
    messages: Array<string>,
    data: {}
};

export const usersAPI = {
    async getUsers(currentPage = 1, count = 10) {
        let res = await instance.get<TGetUsersResponse>(`users?page=${currentPage}&count=${count}`)
        return res.data;
    },

    async follow(userId: number) {
        let res = await instance.post<TFollowResponse>(`follow/${userId}`)
        return res.data;
    },

    async unfollow(userId: number) {
        let res = await instance.delete<TUnfollowResponse>(`follow/${userId}`)
        return res.data;
    },

};

export const profileAPI = {
    async getProfile(userId: number) {
        let res = await instance.get(`profile/${userId}`);
        return res.data;
    },
    async getStatus(userId: number) {
        let res = await instance.get(`profile/status/${userId}`)
        return res.data;
    },
    async updateStatus(status: string) {
        let res = await instance.put(`profile/status`, { status: status })
        return res.data;
    },
    async savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        let res = await instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data;
    }
};

export enum EnResultCodes {
    Success = 0,
    Error = 1
}

export enum EnResultCodesForCaptcha {
    CaptchaIsRequired = 10
}


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
type TLogoutResponse = {
    data: {},
    resultCode: EnResultCodes | number,
    messages: Array<string>
};

export const authAPI = {
    async me() {
        let res = await instance.get<TMeResponse>(`auth/me`);
        return res.data;
    },
    async login(email: string, password: string, rememberMe: boolean, captcha: string) {
        let res = await instance.post<TLoginResponse>(`auth/login`, { email, password, rememberMe, captcha });
        return res.data;
    },
    async logout() {
        let res = await instance.delete<TLogoutResponse>(`auth/login`);
        return res.data;
    }
};

