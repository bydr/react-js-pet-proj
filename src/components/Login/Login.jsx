import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {onLogin} from "../../redux/auth-reducer";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="">
                <Field placeholder={"Login"} name={"email"} type={"text"} component={"input"} />
            </div>
            <div className="">
                <Field placeholder={"Password"} name={"password"} type={"password"} component={"input"} />
            </div>
            <div className="">
                <div className="checkbox">
                    <Field name={"rememberMe"} type={"checkbox"} component={"input"} /> remember me
                </div>
            </div>
            <div className="">
                <button className="drButton">Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
        props.onLogin(formData);
    };
    return <div>
        <h2>Login</h2>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>;
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, {onLogin})(Login);
