import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";

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
                ...action.payload, // из data деструктуризировали данные в значения
            };
        }
        default: return state;
    }
};

//action creators
export const setUserAuthData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_AUTH_DATA,
        payload: { userId, email, login, isAuth }
    };
};


//thunk creators
export const getAuthUserData = () => async (dispatch) => {
    let data = await authAPI.me();
    if (data.resultCode === 0) {
        // debugger;
        let {id, email, login} = data.data;
        dispatch(setUserAuthData(id, email, login, true));
    }
};

export const login = (formData) => async (dispatch) => {
    let {email, password, rememberMe, capcha} = formData;
    let data = await authAPI.login(email, password, rememberMe, capcha);
    if (data.resultCode === 0) {
        // debugger;
        dispatch(getAuthUserData());
    } else {
        let errors = [];
        if (data.messages.length > 0) {
            errors = [...data.messages];
        } else {
            errors = ["Some errors"];
        }
        dispatch(stopSubmit("login", { _error: errors }));
    }
};

export const logout = () => async dispatch => {
    let data = await authAPI.logout();
    if (data.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false));
    }
};

export default authReducer;
