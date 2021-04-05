import {authAPI} from "../api/api";

const SET_USER_AUTH_DATA = "SET_USER_AUTH_DATA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER_AUTH_DATA: {
            return {
                ...state,
                ...action.data, // из data деструктуризировали данные в значения
                isAuth: true
            };
        }
        default: return state;
    }
};

//action creators
export const setUserAuthData = (userId, email, login) => {
    return {
        type: SET_USER_AUTH_DATA,
        data: { userId, email, login }
    };
};

//thunk creators
export const getAuthUserData = () => (dispatch) => {
    authAPI.getAuthMe().then(data => {
        if (data.resultCode === 0) {
            let {id, email, login} = data.data;
            dispatch(setUserAuthData(id, email, login));
        }
    });
};

export default authReducer;
