import {profileAPI} from "../api/api";
import {PhotosType, PostType, ProfileType} from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
    posts: [
        {id: 1, message: "Message 01", likes: 12},
        {id: 2, message: "Message 02", likes: 2},
        {id: 3, message: "Message 03", likes: 5},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};

type InitialStateType = typeof initialState;

//state сейчас это this._state.profilePage
const profileReducer = (state = initialState, action:any) : InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likes: 10
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
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
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        }
        default: return state;
    }
};

//action creators
type AddPostActionType = {
    type: typeof ADD_POST,
    newPostText: string
};
export const addPost = (newPostText: string): AddPostActionType => ({
    type: ADD_POST,
    newPostText
});
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
};
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
});
type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string
};
export const setStatus = (status: string): SetStatusActionType => {
    return {
        type: SET_STATUS,
        status
    }
};
type SetPhotoActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
};
export const savePhotoSuccess = (photos: PhotosType): SetPhotoActionType => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos
    }
};


//thunk creators
export const getProfile = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(data));
};
export const getStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
};
export const updateStatus = (status: string) => async (dispatch: any) => {
    let data: any = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};
export const updatePhoto = (photos: any) => async (dispatch: any) => {
    let data: any = await profileAPI.savePhoto(photos);
    if (data.resultCode === 0) {
        console.log('dispatch savePhotoSuccess');
        dispatch(savePhotoSuccess(data.data.photos));
    }
};

export default profileReducer;
