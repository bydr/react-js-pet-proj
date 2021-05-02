import {profileAPI} from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

let initialState = {
    posts: [
        {id: 1, message: "Message 01", likes: 12},
        {id: 2, message: "Message 02", likes: 2},
        {id: 3, message: "Message 03", likes: 5},
    ],
    profile: null,
    status: null
};

//state сейчас это this._state.profilePage
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likes: 10
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        default: return state;
    }
};

//action creators
export const addPost = (newPostText) => {
    return {
        type: ADD_POST,
        newPostText
    }
};
export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
};
export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
};


//thunk creators
export const getProfile = (userId) => async dispatch => {
    let data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
};
export const getStatus = (userId) => async dispatch => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
};
export const updateStatus = (status) => async dispatch => {
    let data = profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export default profileReducer;
