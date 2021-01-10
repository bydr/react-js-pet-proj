const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";
const SEND_MESSAGE = "SEND-MESSAGE";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: "Message 01", likes: 12},
                {id: 2, message: "Message 02", likes: 2},
                {id: 3, message: "Message 03", likes: 5},
            ],
            newPostText: "new post text"
        },
        messengerPage: {
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
        },
        navbar: {
            friends: [
                {id: 1, name: 'Dima'},
                {id: 2, name: 'Daniil'},
                {id: 3, name: 'Petya'},
            ],
            list: [
                {id: 1, title: "Profile", path: "/profile"},
                {id: 2, title: "Messenger", path: "/messenger"},
                {id: 2, title: "News", path: "/news"},
                {id: 2, title: "Music", path: "/music"},
                {id: 2, title: "Settings", path: "/settings"},
            ]
        }
    },

    _callSubscriber() {
        console.log("State changed");
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    getState() {
        return this._state;
    },

    _addPost() {
        let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likes: 10
        };

        if (newPost.message === "") return;

        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = "";
        this._callSubscriber(this._state);
    },
    _updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },

    _addMessage() {
        let newMessage = {
            message: this._state.messengerPage.newMessageText,
        };

        if (newMessage.message === "") return;

        this._state.messengerPage.messages.push(newMessage);
        this._state.messengerPage.newMessageText = "";
        this._callSubscriber(this._state);
    },
    _updateNewMessageText(text) {
        this._state.messengerPage.newMessageText = text;
        this._callSubscriber(this._state);
    },

    dispatch(action) {
        if (action.type === ADD_POST) {
            this._addPost();
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._updateNewPostText(action.newText);
        } else if (action.type === SEND_MESSAGE) {
            this._addMessage();
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._updateNewMessageText(action.newMessageText);
        }
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

window.store = store;
export default store;
