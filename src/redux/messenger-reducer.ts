import {DialogType, MessageType} from "../types/types";

const SEND_MESSAGE = "messenger/SEND-MESSAGE";

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Daniil'},
        {id: 3, name: 'Petya'},
        {id: 4, name: 'Valery'},
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "Hello?"},
        {id: 2, message: "Good day"},
        {id: 3, message: "Hello React"},
        {id: 4, message: "Greate morning"},
    ] as Array<MessageType>
};

type InitialStateType = typeof initialState;

//state здесь это this._state.messengerPage
const messengerReducer = (state = initialState,
                          action:any) : InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = { id: 5, message: action.newMessageBody };
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        }
        default: return state;
    }
};

//action creators
type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
};
export const sendMessage = (newMessageBody:string) : SendMessageActionType => ({
    type: SEND_MESSAGE,
    newMessageBody
});

//thunk creators

export default messengerReducer;
