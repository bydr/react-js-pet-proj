import {usersAPI} from "../api/api";
import {updateObjectsInArray} from "../utils/helpers/object-helpers";

const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

let initState = {
    users: [],
    pageSize: 7, // кол-во на странице
    totalUsersCount: 0, // сколько всего пользователей
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initState, action) => {
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
                    : state.followingInProgress.filter(id => id !== action.userId) //иначе filter вернет новый массив юзеров
            }
        }
        default:
            return state;
    }
};

//action creators functions

//подписаться на пользователя
export const followSuccess = (userId) => {
    return {
        type: FOLLOW_USER,
        userId: userId
    };
};
//отписаться от пользователя
export const unfollowSuccess = (userId) => {
    return {
        type: UNFOLLOW_USER,
        userId: userId
    };
};
//закинуть в стейт всех юзеров
export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users: users
    };
};
//обновить, закинуть в стейте номер текущей страницы
export const setCurrentPage = (pageNumber) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage: pageNumber
    };
};
//установить значение всех пользователей
export const setTotalUsersCount = (count) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount: count
    };
};
//показать / скрыть главный прелоадер
export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    };
};
//включить / отключить кнопку following
export const toggleFollowingProgress = (isFetching, userId) => {
    return {
        type: TOGGLE_FOLLOWING_PROGRESS,
        isFetching,
        userId
    };
};

//thunk creators functions

export const requestUsers = (page, pageSize) => async dispatch => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
};

const followingToggle = async (APIMethod, userId, actionCreator, dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await APIMethod(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId) => async dispatch => {
    await followingToggle(usersAPI.follow.bind(this), userId, followSuccess.bind(this), dispatch);
};

export const unfollow = (userId) => async dispatch => {
    await followingToggle(usersAPI.unfollow.bind(this), userId, unfollowSuccess.bind(this), dispatch);
};

export default usersReducer;
