import {InferTActions} from "./redux-store";
import {TChatMessage} from "../types/types";


let initialState = {
    messages: [] as TChatMessage[]
};
type InitialStateType = typeof initialState;
type TActions = InferTActions<typeof actions>;

const chatReducer = (state = initialState, action: TActions): InitialStateType => {
    switch (action.type) {
        case "chat/SET_MESSAGES": {
            return {
                ...state,
                messages: [...state.messages, ...action.messages]
            }
        }
        default: return state;
    }
};

export const actions = {
    setMessages: (messages: TChatMessage[]) => ({
        type: "chat/SET_MESSAGES",
        messages
    }) as const
};

export default chatReducer;
