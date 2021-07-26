import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {connect, useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {FormControl} from "../common/FormsControls/FormControls";
import styles from "./Login.module.css";
import {Redirect} from "react-router";
import {required} from "../../utils/validators/validators";
import {AppStateType} from "../../redux/redux-store";
import App from "../../App";

const Input = FormControl("input");

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
};

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> =
    ({error, handleSubmit}) => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);
    const dispatch = useDispatch();

    return (
        <div className={styles.formLoginWrapper}>
            <form className={styles.formLogin} onSubmit={handleSubmit}>
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

                {
                    captchaUrl &&
                    <>
                        <img src={captchaUrl} alt=""/>
                        <div className="">
                            <Field placeholder={"Code"}
                                   name={"captcha"}
                                   type={"password"}
                                   component={Input}
                                   validate={[required]} />
                        </div>
                    </>
                }

                { error && <div className={styles.formGroupErrors}>{error}</div> }

                <div className="">
                    <button className="btn-custom__accent">Login</button>
                </div>
            </form>
        </div>
    );
};

const LoginReduxForm = reduxForm<LoginFormValuesType>({ form: 'login' })(LoginForm);

const Login: React.FC = (props) => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const dispatch = useDispatch();

    const onSubmit = (formData: any) => {
        dispatch(login(formData));
    };
    if (isAuth) { return <Redirect to={"/profile"} /> }
    return <div>
        <h2>Login</h2>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>;
};


export default Login;
