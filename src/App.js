import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route} from "react-router-dom";
import store from "./redux/redux-store";
import React from "react";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import MessengerContainer from "./components/Messenger/MessengerContainer";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
            <HeaderContainer />
            <Navbar state={store.getState().navbar}/>
            <div className="content">

                <Route path="/profile/:userId?"
                       render={() => <ProfileContainer />}/>

                <Route path="/messenger"
                       render={() => <MessengerContainer />}/>

                <Route path="/users"
                       render={() => <UsersContainer />}/>

                <Route path="/login"
                       render={() => <Login />}/>

                <Route path="/news" component={News}/>
                <Route path="/music" component={Music}/>
                <Route path="/settings" component={Settings}/>
            </div>
        </div>
        </BrowserRouter>
    );
};

export default App;
