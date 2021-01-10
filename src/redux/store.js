import profileReducer from "./profile-reducer";
import messengerReducer from "./messenger-reducer";
import navbarReducer from "./navbar-reducer";

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

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messengerPage = messengerReducer(this._state.messengerPage, action);
        this._state.navbar = navbarReducer(this._state.navbar, action);

        this._callSubscriber(this._state);
    }
};

window.store = store;
export default store;
