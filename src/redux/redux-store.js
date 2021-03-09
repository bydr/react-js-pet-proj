import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import messengerReducer from "./messenger-reducer";
import navbarReducer from "./navbar-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messengerPage: messengerReducer,
    navbar: navbarReducer
});

let store = createStore(reducers);

window.store = store;
export default store;
