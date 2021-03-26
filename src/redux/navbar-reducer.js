let initialState = {
    friends: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Daniil'},
        {id: 3, name: 'Petya'},
    ],
    list: [
        {id: 1, title: "Profile", path: "/profile"},
        {id: 2, title: "Users", path: "/users"},
        {id: 3, title: "Messenger", path: "/messenger"},
        {id: 4, title: "News", path: "/news"},
        {id: 5, title: "Music", path: "/music"},
        {id: 6, title: "Settings", path: "/settings"},
    ]
};

const navbarReducer = (state = initialState, action) => {
    return state;
};

export default navbarReducer;
