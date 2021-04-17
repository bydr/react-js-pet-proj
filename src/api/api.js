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
    getUsers(currentPage = 1, count = 10) {
        return instance
            .get(`users?page=${currentPage}&count=${count}`)
            .then(response => response.data);
    },

    follow(userId) {
        return instance
            .post(`follow/${userId}`)
            .then(response => response.data);
    },

    unfollow(userId) {
        return instance
            .delete(`follow/${userId}`)
            .then(response => response.data);
    },

};

export const profileAPI = {
    getProfile(userId) {
        return instance
            .get(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId) {
        return instance
            .get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance
            .put(`profile/status`, { status: status })
            .then(response => response.data);
    }
};

export const authAPI = {
    me() {
        return instance
            .get(`auth/me`)
            .then(response => response.data);
    },
    login(email, password, rememberMe, capcha) {
        return instance
            .post(`auth/login`, { email, password, rememberMe, capcha })
            .then(response => response.data);
    },
    logout() {
        return instance
            .delete(`auth/login`)
            .then(response => response.data);
    }
};
