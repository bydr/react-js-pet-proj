const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const SET_USER_PROFILE = "SET_USER_PROFILE";

let initialState = {
    posts: [
        {id: 1, message: "Message 01", likes: 12},
        {id: 2, message: "Message 02", likes: 2},
        {id: 3, message: "Message 03", likes: 5},
    ],
    newPostText: "new post text",
    profile: null
};

//state сейчас это this._state.profilePage
const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likes: 10
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        default: return state;
    }
};

export const addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
};
export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
};
export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile: profile
    }
};

export default profileReducer;
