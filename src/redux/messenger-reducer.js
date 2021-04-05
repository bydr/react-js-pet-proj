const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
    dialogs: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Daniil'},
        {id: 3, name: 'Petya'},
        {id: 4, name: 'Valery'},
    ],
    messages: [
        {id: 1, message: "Hello?"},
        {id: 2, message: "Good day"},
        {id: 3, message: "Hello React"},
        {id: 4, message: "Greate morning"},
    ],
    newMessageText: "new message text"
};

//state здесь это this._state.messengerPage
const messengerReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = {
                id: 5,
                message: state.newMessageText
            };
            return {
                ...state,
                //скопировали массив messages стейта и добавили новое сообщение через спред оператор
                messages: [...state.messages, newMessage],
                newMessageText: ""
            };
        }

        case UPDATE_NEW_MESSAGE_TEXT: {
            return {
                ...state,
                newMessageText: action.newMessageText
            };
        }

        default: return state;
    }
};

export const sendMessage = () => {
    return {
        type: SEND_MESSAGE
    };
};
export const updateNewMessageText = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newMessageText: text
    };
};

export default messengerReducer;
