import * as axios from "axios";

//создаем отдельный экземпляр axios
// пр. для работы с разными версиями api
const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "1c7db931-b755-452c-a345-dac522539cf2"
    }
});

export const usersAPI = {
    async getUsers(currentPage = 1, count = 10) {
        let res = await instance.get(`users?page=${currentPage}&count=${count}`)
        return res.data;
    },

    async follow(userId) {
        let res = await instance.post(`follow/${userId}`)
        return res.data;
    },

    async unfollow(userId) {
        let res = await instance.delete(`follow/${userId}`)
        return res.data;
    },

};

export const profileAPI = {
    async getProfile(userId) {
        let res = await instance.get(`profile/${userId}`);
        return res.data;
    },
    async getStatus(userId) {
        let res = await instance.get(`profile/status/${userId}`)
        return res.data;
    },
    async updateStatus(status) {
        let res = await instance.put(`profile/status`, { status: status })
        return res.data;
    }
};

export const authAPI = {
    async me() {
        let res = await instance.get(`auth/me`);
        return res.data;
    },
    async login(email, password, rememberMe, capcha) {
        let res = await instance.post(`auth/login`, { email, password, rememberMe, capcha });
        return res.data;
    },
    async logout() {
        let res = await instance.delete(`auth/login`);
        return res.data;
    }
};
