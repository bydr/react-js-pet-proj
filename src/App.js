import React, {Suspense} from "react";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route} from "react-router-dom";
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import MessengerContainer from "./components/Messenger/MessengerContainer";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from "react-router";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.isInitialize) return <Preloader />;

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar state={this.props.navbar}/>
                <div className="content">

                    <Route path="/profile/:userId?"
                           render={() => <ProfileContainer/>}/>

                    <Route path="/messenger"
                           render={() => <MessengerContainer/>}/>

                    <Route path="/users"
                           render={() => {
                               return <Suspense fallback={<div>Загрузка...</div>}><UsersContainer/></Suspense>;
                           }}/>

                    <Route path="/login"
                           render={() => <Login/>}/>

                    <Route path="/news" component={News}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/settings" component={Settings}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    navbar: state.navbar,
    isInitialize: state.app.isInitialize
});

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}),
)(App);
