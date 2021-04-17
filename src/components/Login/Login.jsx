import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {FormControl} from "../common/FormsControls/FormControls";
import styles from "./Login.module.css";
import {Redirect} from "react-router";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const Input = FormControl("input");

const LoginForm = (props) => {

    let errors = props.error && props.error.map(e => <p>{e}</p>);

    return (
        <div className={styles.formLoginWrapper}>
            <form className={styles.formLogin} onSubmit={props.handleSubmit}>
                <div className="">
                    <Field placeholder={"Login"}
                           name={"email"}
                           type={"text"}
                           component={Input}
                           validate={[required]} />
                </div>
                <div className="">
                    <Field placeholder={"Password"}
                           name={"password"}
                           type={"password"}
                           component={Input}
                           validate={[required]} />
                </div>
                <div className="">
                    <div className="checkbox">
                        <Field name={"rememberMe"}
                               type={"checkbox"}
                               component={Input} /> remember me
                    </div>
                </div>

                { errors && <div className={styles.formGroupErrors}>{errors}</div> }

                <div className="">
                    <button className="drButton">Login</button>
                </div>
            </form>
        </div>
    );
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData);
    };

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h2>Login</h2>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>;
};

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);