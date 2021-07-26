import {TIsFriend, TResponse, UserType} from "../types/types";
import {instance} from "./api";

type TGetUsersResponse = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
};

export const usersAPI = {
    getUsers(currentPage = 1, count = 10, isFriend: TIsFriend = null) {
        return instance.get<TGetUsersResponse>(`users?page=${currentPage}&count=${count}
        ${isFriend && `&friend=${isFriend}`}`)
            .then(res => res.data);
    },

    follow(userId: number) {
        return instance.post<TResponse>(`follow/${userId}`)
            .then(res => res.data);
    },

    unfollow(userId: number) {
        return instance.delete<TResponse>(`follow/${userId}`)
            .then(res => res.data);
    },

};
