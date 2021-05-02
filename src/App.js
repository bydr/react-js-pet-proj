import React, { Suspense } from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {connect, Provider} from "react-redux";
import store from "./redux/redux-store";
import {compose} from "redux";
import {withRouter} from "react-router";
import {initializeApp} from "./redux/app-reducer";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import MessengerContainer from "./components/Messenger/MessengerContainer";
import Preloader from "./components/common/Preloader/Preloader";
import withSuspense from "./hoc/withSuspense";
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const Login = React.lazy(() => import('./components/Login/Login'));

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.isInitialize) return <Preloader />;

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar />
                <div className="content">

                    <Route path="/profile/:userId?"
                           render={() => <ProfileContainer/>}/>

                    <Route path="/messenger"
                           render={() => <MessengerContainer/>}/>

                    <Route path="/users"
                           render={withSuspense(UsersContainer)}/>

                    <Route path="/login"
                           render={withSuspense(Login)}/>

                    <Route path="/news" component={News}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/settings" component={Settings}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isInitialize: state.app.isInitialize
});

let AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const AppProd = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    );
};

export default AppProd;
