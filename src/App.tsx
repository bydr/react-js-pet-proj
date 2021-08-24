import React, {lazy, useEffect} from "react";
import {BrowserRouter, Route, Router} from "react-router-dom";
import {useHistory, withRouter} from "react-router";
import {Provider, useDispatch, useSelector} from "react-redux";
import store, {AppStateType} from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Preloader from "./components/common/Preloader/Preloader";
import withSuspense from "./hoc/withSuspense";
import Header from "./components/Header/Header";
import {Helmet} from "react-helmet";

const ProfilePage = lazy( () => import('./pages/Profile/ProfilePage'));
const MessengerContainer = lazy( () => import('./components/Messenger/MessengerContainer'));
const UsersPage = lazy( () => import('./components/Users/UsersPage'));
const ChatPage = lazy(() => import('./pages/Chat/ChatPage'));
const Login = lazy(() => import('./components/Login/Login'));

const App: React.FC = (props) => {
    const isInitialize = useSelector((state: AppStateType) => state.app.isInitialize);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApp());
    }, []);

    return <>
        {!isInitialize && <Preloader/>}
        <Helmet>
            <title>React App</title>
        </Helmet>
        <div className="app-wrapper">
            <Header />
            <Navbar />
            <div className="content">

                <Route path="/profile/:userId?"
                       component={withSuspense(ProfilePage)}/>

                <Route path="/messenger"
                       component={withSuspense(MessengerContainer)}/>

                <Route path="/users"
                       component={withSuspense(UsersPage)}/>

                <Route path="/chat"
                       component={withSuspense(ChatPage)}/>

                <Route path="/login"
                       component={withSuspense(Login)}/>

                <Route path="/news" component={News}/>
                <Route path="/music" component={Music}/>
                <Route path="/settings" component={Settings}/>
            </div>
        </div>
    </>;
}

const AppContainer = withRouter(App);

const AppProd: React.FC = () => {
    const history = useHistory();

    return (
        <Provider store={store}>
            <BrowserRouter>
                <AppContainer/>
            </BrowserRouter>
        </Provider>
    );
};

export default AppProd;
