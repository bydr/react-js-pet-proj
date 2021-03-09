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
        {message: "Hello?"},
        {message: "Good day"},
        {message: "Hello React"},
        {message: "Greate morning"},
    ],
    newMessageText: "new message text"
};

//state здесь это this._state.messengerPage
const messengerReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                message: state.newMessageText,
            };

            if (newMessage.message === "") return state;

            state.messages.push(newMessage);
            state.newMessageText = "";
            return state;

        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newMessageText;
            return state;

        default: return state;
    }
};

export const sendMessageActionCreator = () => {
    return {
        type: SEND_MESSAGE
    };
};
export const updateNewMessageTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newMessageText: text
    };
};

export default messengerReducer;
