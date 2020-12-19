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
            ]
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
    getState() {
        return this._state;
    },
    addPost() {
        let newPost = {
            id: 5,
            message: this._state.profilePage.newPostText,
            likes: 10
        };

        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = "";
        this._callSubscriber(this._state);
    },
    updateNewPostText(newText) {
        this._state.profilePage.newPostText = newText;
        this._callSubscriber(this._state);
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
};



export default store;
