const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";

let initState = {
    users: [],
    pageSize: 5, // кол-во на странице
    totalUsersCount: 0, // сколько всего пользователей
    currentPage: 1,
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
        default: return state;
    }
};

//подписаться на пользователя
export const follow = (userId) => {
    return {
        type: FOLLOW_USER,
        userId: userId
    };
};
//отписаться от пользователя
export const unfollow = (userId) => {
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

export default usersReducer;
