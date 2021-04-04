const SET_USER_AUTH_DATA = "SET_USER_AUTH_DATA";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
};

//state сейчас это this._state.profilePage
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

export const setUserAuthData = (userId, email, login) => {
    return {
        type: SET_USER_AUTH_DATA,
        data: { userId, email, login }
    };
};

export default authReducer;
