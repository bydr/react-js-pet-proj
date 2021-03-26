import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from './components/Profile/Profile';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route} from "react-router-dom";
import Messenger from "./components/Messenger/Messenger";
import store from "./redux/redux-store";
import React from "react";
import UsersContainer from "./components/Users/UsersContainer";

const App = (props) => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
            <Header/>
            <Navbar state={store.getState().navbar}/>
            <div className="content">

                <Route path="/profile"
                       render={() => <Profile store={store}/>}/>

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
