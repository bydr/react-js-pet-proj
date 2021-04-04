import {usersAPI} from "../api/api";

const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initState = {
    users: [],
    pageSize: 5, // кол-во на странице
    totalUsersCount: 0, // сколько всего пользователей
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initState, action) => {
    switch(action.type) {
        case FOLLOW_USER: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        //вовзращаем копию юзера
                        // и меняем followed на true
                        return {...u, followed: true }
                    }
                    return u;
                })
            };
        }
        case UNFOLLOW_USER: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false};
                    }
                    return u;
                })
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
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId] //если true то накапливаем юзеров в процессе folowing
                    : state.followingInProgress.filter(id => id !== action.userId) //иначе filter вернет новый массив юзеров
            }
        }
        default: return state;
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
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    };
};

//thunk creators functions

export const getUsers = (currentPage, pageSize) => {
    return dispatch => {
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    };
};

export const follow = (userId) => dispatch => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.follow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(followSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    });
};

export const unfollow = (userId) => dispatch => {
    dispatch(toggleFollowingProgress(true, userId));
    usersAPI.unfollow(userId).then(data => {
        if (data.resultCode === 0) {
            dispatch(unfollowSuccess(userId));
        }
        dispatch(toggleFollowingProgress(false, userId));
    });
};

export default usersReducer;
