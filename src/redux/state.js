let state = {
    profilePage: {
        posts: [
            {message: "Message 01"},
            {message: "Message 02"},
            {message: "Message 03"},
        ],
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
};

export default state;
