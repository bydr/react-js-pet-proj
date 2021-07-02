import {getAuthUserData} from "./auth-reducer";

const INITIALIZE_SUCCESS = "app/INITIALIZE_SUCCESS";

type InitialStateType = {
    isInitialize: boolean
};

let initialState: InitialStateType = {
    isInitialize: false
};

const appReducer = (state = initialState, action: any) : InitialStateType => {
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
type InitializeSuccessActionType = {
    type: typeof INITIALIZE_SUCCESS
};
export const initializeSuccess = (): InitializeSuccessActionType => ({type: INITIALIZE_SUCCESS});

//thunks creator
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise])
        .then(() => {
            dispatch(initializeSuccess());
        });
};

export default appReducer;
