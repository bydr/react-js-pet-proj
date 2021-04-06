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
    ]
};

//state здесь это this._state.messengerPage
const messengerReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let newMessage = { id: 5, message: action.newMessageBody };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };
        }
        default: return state;
    }
};

//action creators
export const sendMessage = (newMessageBody) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    };
};

//thunk creators

export default messengerReducer;
