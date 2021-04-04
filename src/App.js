import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route} from "react-router-dom";
import Messenger from "./components/Messenger/Messenger";
import store from "./redux/redux-store";
import React from "react";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
            <HeaderContainer />
            <Navbar state={store.getState().navbar}/>
            <div className="content">

                <Route path="/profile/:userId?"
                       render={() => <ProfileContainer store={store}/>}/>

                <Route path="/messenger"
                       render={() => <Messenger store={store}/>}/>

                <Route path="/users"
                       render={() => <UsersContainer store={store}/>}/>

                <Route path="/news" component={News}/>
                <Route path="/music" component={Music}/>
                <Route path="/settings" component={Settings}/>
            </div>
        </div>
        </BrowserRouter>
    );
};

export default App;
