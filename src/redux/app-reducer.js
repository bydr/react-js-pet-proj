import {getAuthUserData} from "./auth-reducer";

const INITIALIZE_SUCCESS = "INITIALIZE_SUCCESS";

let initialState = {
    isInitialize: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZE_SUCCESS: {
            return {
                ...state,
                isInitialize: true,
            };
        }
        default:
            return state;
    }
};

//action creator
export const initializeSuccess = () => ({type: INITIALIZE_SUCCESS});

//thunks creator
export const initializeApp = () => dispatch => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializeSuccess());
        });
};

export default appReducer;
