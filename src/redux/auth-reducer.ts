import {EnResultCodes, EnResultCodesForCaptcha} from "../api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const SET_USER_AUTH_DATA = "auth/SET_USER_AUTH_DATA";
const SET_CAPTCHA_URL = "auth/SET_CAPTCHA_URL";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
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
        case SET_CAPTCHA_URL: {
            return {
                ...state,
                captchaUrl: action.captchaUrl
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


type SetCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL,
    captchaUrl: string
};
export const setCaptchaUrl = (url: string):SetCaptchaUrlActionType => {
    debugger;
    return {
        type: SET_CAPTCHA_URL,
        captchaUrl: url
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
    let {email, password, rememberMe, captcha} = formData;
    let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === EnResultCodes.Success) {
        // debugger;
        dispatch(getAuthUserData());
    } else {

        if (data.resultCode === EnResultCodesForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }

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

export const getCaptchaUrl = () => async (dispatch: any) => {
    let data = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrl(data.url));
};

export default authReducer;
