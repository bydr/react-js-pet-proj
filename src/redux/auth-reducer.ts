import {authAPI, EnResultCodes, EnResultCodesForCaptcha} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_AUTH_DATA = "auth/SET_USER_AUTH_DATA";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any) : InitialStateType => {

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
type SetUserAuthDataActionType = {
    type: typeof SET_USER_AUTH_DATA,
    payload: {
        userId: number | null,
        email: string | null,
        login: string | null,
        isAuth: boolean
    }
};
export const setUserAuthData = (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean): SetUserAuthDataActionType => {
    return {
        type: SET_USER_AUTH_DATA,
        payload: { userId, email, login, isAuth }
    };
};


//thunk creators
export const getAuthUserData = () => async (dispatch: any) => {
    let data = await authAPI.me();
    if (data.resultCode === EnResultCodes.Success) {
        // debugger;
        let {id, email, login} = data.data;
        dispatch(setUserAuthData(id, email, login, true));
    }
};

export const login = (formData: any) => async (dispatch: any) => {
    let {email, password, rememberMe, capcha} = formData;
    let data = await authAPI.login(email, password, rememberMe, capcha);
    if (data.resultCode === EnResultCodes.Success) {
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

export const logout = () => async (dispatch: any) => {
    let data = await authAPI.logout();
    if (data.resultCode === EnResultCodes.Success) {
        dispatch(setUserAuthData(null, null, null, false));
    }
};

export default authReducer;
