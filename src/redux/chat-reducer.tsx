import {AppStateType, InferTActions} from "./redux-store";
import {StatusType, TChatMessage} from "../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {chatAPI} from "../api/chat-api";


let initialState = {
    messages: [] as TChatMessage[],
    status: 'pending' as StatusType,
};
type InitialStateType = typeof initialState;
type TActions = InferTActions<typeof actions>;

const chatReducer = (state = initialState, action: TActions): InitialStateType => {
    switch (action.type) {
        case "chat/SET_MESSAGES": {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        }
        case "chat/SET_STATUS": {
            return {
                ...state,
                status: action.payload.status
            }
        }
        default: return state;
    }
};

export const actions = {
    setMessages: (messages: TChatMessage[]) => ({
        type: "chat/SET_MESSAGES",
        payload: {messages}
    }) as const,
    setStatus: (status: StatusType) => ({
        type: "chat/SET_STATUS",
        payload: {status}
    }) as const
};


//thunk creators functions
type DispatchType = Dispatch<TActions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, TActions>;

let _newMessagesHandler: ((messages: TChatMessage[]) => void) | null = null;
let newMessagesHandlerCreator = (dispatch: DispatchType) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages:TChatMessage[]) => {
            dispatch(actions.setMessages(messages));
        };
    }

    return _newMessagesHandler;
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
let statusChangedHandlerCreator = (dispatch: DispatchType) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status: StatusType) => {
            dispatch(actions.setStatus(status));
        };
    }
    return _statusChangedHandler;
}

export const startMessagesListening = (): ThunkType => async (dispatch:DispatchType) => {
    chatAPI.start();
    await chatAPI.subscribe('message-received', newMessagesHandlerCreator(dispatch));
    await chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
}

export const stopMessagesListening = (): ThunkType => async (dispatch:DispatchType) => {
    await chatAPI.unsubscribe('message-received', newMessagesHandlerCreator(dispatch));
    await chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
}

export const sendMessage = (message: string): ThunkType => async (dispatch: DispatchType) => {
    await chatAPI.sendMessage(message);
}

export default chatReducer;
