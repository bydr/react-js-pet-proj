import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferTActions} from "./redux-store";
import {profileAPI} from "../api/profile-api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
    posts: [
        {id: 1, message: "Message 01", likes: 12},
        {id: 2, message: "Message 02", likes: 2},
        {id: 3, message: "Message 03", likes: 5},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: '',
    isFetching: false
};

type InitialStateType = typeof initialState;
type TActions = InferTActions<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TActions>;

//state сейчас это this._state.profilePage
const profileReducer = (state = initialState, action:TActions) : InitialStateType => {
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
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default: return state;
    }
};

//action creators
export const actions = {
    addPost: (newPostText: string) => ({
        type: ADD_POST,
        newPostText
    }) as const,
    setUserProfile: (profile: ProfileType) => ({
        type: SET_USER_PROFILE,
        profile
    }) as const,
    setStatus: (status: string) => ({
        type: SET_STATUS,
        status
    }) as const,
    savePhotoSuccess: (photos: PhotosType) => ({
        type: SAVE_PHOTO_SUCCESS,
        photos
    }) as const,
    toggleIsFetching: (isFetching: boolean) => ({
        type: TOGGLE_IS_FETCHING,
        isFetching
    }) as const,
};

//thunk creators
export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFetching(true));
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
    dispatch(actions.toggleIsFetching(false));
};
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
};
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data: any = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
};
export const updatePhoto = (photosFile: any): ThunkType => async (dispatch) => {
    let data: any = await profileAPI.savePhoto(photosFile);
    if (data.resultCode === 0) {
        console.log('dispatch savePhotoSuccess');
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
};

export default profileReducer;
