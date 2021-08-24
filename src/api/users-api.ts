import {TFriend, TResponse, UserType} from "../types/types";
import {instance} from "./api";

type TGetUsersResponse = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
};

export const usersAPI = {
    getUsers(currentPage = 1, count = 10, term: string = '', friend: TFriend = 'null') {
        return instance.get<TGetUsersResponse>(`users`+`?page=${currentPage}&count=${count}`
            +`&term=${term}&friend=${friend === 'null' ? null : friend === 'true'}`)
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
