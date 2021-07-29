import {updateObjectsInArray} from "../utils/helpers/object-helpers";
import {TFriend, TFriendStateItem, TResponse, UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferTActions} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";

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
    followingInProgress: [] as Array<number>, // array of users ids
    friendState: [
        { value: null, message: "all users" },
        { value: false, message: "only not followed users" },
        { value: true, message: "only followed users" },
    ] as TFriendStateItem[]
};
type InitialStateType = typeof initialState;


const usersReducer = (state = initialState, action: TActions): InitialStateType => {
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
export const actions = {
    //подписаться на пользователя
    followSuccess: (userId: number) => ({
        type: FOLLOW_USER,
        userId
    } as const),
//отписаться от пользователя
    unfollowSuccess: (userId: number) => ({
        type: UNFOLLOW_USER,
        userId
    } as const),
//закинуть в стейт всех юзеров
    setUsers: (users: Array<UserType>) => ({
        type: SET_USERS,
        users
    } as const),
//обновить, закинуть в стейте номер текущей страницы
    setCurrentPage: (pageNumber: number) => ({
        type: SET_CURRENT_PAGE,
        currentPage: pageNumber
    } as const),
//установить значение всех пользователей
    setTotalUsersCount: (count: number) => ({
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: count
    } as const),
//показать / скрыть главный прелоадер
    toggleIsFetching: (isFetching: boolean) => ({
        type: TOGGLE_IS_FETCHING,
        isFetching
    } as const),
//включить / отключить кнопку following
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_FOLLOWING_PROGRESS,
        isFetching,
        userId
    } as const)
};
type TActions = InferTActions<typeof actions>;


//thunk creators functions
type DispatchType = Dispatch<TActions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TActions>;

export const requestUsers = (page: number, pageSize: number, friend: TFriend = null): ThunkType =>
    async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        let data = await usersAPI.getUsers(page, pageSize, friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        if (friend !== null) {
            dispatch(actions.setCurrentPage(1));
        }
    };


const _followingToggle = async (APIMethod: (userId: number) => Promise<TResponse>,
                                userId: number,
                                actionCreator: (userId: number) => TActions,
                                dispatch: DispatchType) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await APIMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followingToggle(usersAPI.follow.bind(this), userId, actions.followSuccess.bind(this), dispatch);
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followingToggle(usersAPI.unfollow.bind(this), userId, actions.unfollowSuccess.bind(this), dispatch);
};



export default usersReducer;
