import * as React from "react";
import s from "./AddMessageForm.module.css"
import {Field, reduxForm} from "redux-form";

const AddMessageForm = (props) => {
    return (
        <form className={s.messageCreator} onSubmit={props.handleSubmit}>
            <div className={s.messageCreatorWrapper}>
                <div className="form-group">
                    <Field className={s.formControl}
                           name="newMessageBody"
                           component="textarea"
                           />
                </div>
                <div className="form-group justify-content-end">
                    <button className="drButton">Send</button>
                </div>
            </div>
        </form>
    );
};

const AddMessageReduxForm = reduxForm({form: 'addMessageForm'})(AddMessageForm);

export default AddMessageReduxForm;
