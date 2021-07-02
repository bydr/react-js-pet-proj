import {usersAPI} from "../api/api";
import {updateObjectsInArray} from "../utils/helpers/object-helpers";
import {UserType} from "../types/types";
import { ThunkAction } from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Action, Dispatch} from "redux";

const FOLLOW_USER = "users/FOLLOW_USER";
const UNFOLLOW_USER = "users/UNFOLLOW_USER";
const SET_USERS = "users/SET_USERS";
const SET_CURRENT_PAGE = "users/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "users/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "users/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "users/TOGGLE_FOLLOWING_PROGRESS";

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 7, // кол-во на странице
    totalUsersCount: 0, // сколько всего пользователей
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users ids
};
type InitialStateType = typeof initialState;

type ActionsType = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType
    | SetTotalUsersCountPageActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType;

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FOLLOW_USER: {
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.userId, "id", {followed: true})
            };
        }
        case UNFOLLOW_USER: {
            return {
                ...state,
                users: updateObjectsInArray(state.users, action.userId, "id", {followed: false})
            };
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            };
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            };
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId] //если true то накапливаем юзеров в процессе folowing
                    : state.followingInProgress.filter(id => id !== action.userId) //иначе filter вернет новый массив id юзеров
            }
        }
        default:
            return state;
    }
};

//action creators functions

//подписаться на пользователя
type FollowSuccessActionType = {
    type: typeof FOLLOW_USER,
    userId: number
};
export const followSuccess = (userId: number): FollowSuccessActionType => ({
    type: FOLLOW_USER,
    userId
});
//отписаться от пользователя
type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW_USER,
    userId: number
};
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({
    type: UNFOLLOW_USER,
    userId
});
//закинуть в стейт всех юзеров
type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array<UserType>
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
    type: SET_USERS,
    users
});
//обновить, закинуть в стейте номер текущей страницы
type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
};
export const setCurrentPage = (pageNumber: number): SetCurrentPageActionType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: pageNumber
    };
};
//установить значение всех пользователей
type SetTotalUsersCountPageActionType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
};
export const setTotalUsersCount = (count: number): SetTotalUsersCountPageActionType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: count
    };
};
//показать / скрыть главный прелоадер
type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
};
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    };
};
//включить / отключить кнопку following
type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
};
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => {
    return {
        type: TOGGLE_FOLLOWING_PROGRESS,
        isFetching,
        userId
    };
};

//thunk creators functions
type DispatchType = Dispatch<ActionsType>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;
export const requestUsers = (page: number, pageSize: number): ThunkType =>
    async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
};

const _followingToggle = async (APIMethod: (userId:number) => Promise<any>,
                               userId: number,
                               actionCreator: (userId:number) => FollowSuccessActionType | UnfollowSuccessActionType,
                               dispatch: DispatchType) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await APIMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followingToggle(usersAPI.follow.bind(this), userId, followSuccess.bind(this), dispatch);
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followingToggle(usersAPI.unfollow.bind(this), userId, unfollowSuccess.bind(this), dispatch);
};

export default usersReducer;
