import * as React from "react";
import s from "./AddMessageForm.module.css"
import {Field, reduxForm} from "redux-form";
import {FormControl} from "../../../common/FormsControls/FormControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";

const maxLength100 = maxLengthCreator(100);
const Textarea = FormControl("textarea");

const AddMessageForm = (props) => {

    return (
        <form className={s.messageCreator} onSubmit={props.handleSubmit}>
            <div className={s.messageCreatorWrapper}>
                <div className="form-group">
                    <Field name="newMessageBody"
                           component={Textarea}
                           validate={[required, maxLength100]}
                           />
                </div>
                <div className="form-group justify-content-end">
                    <button className="drButton">Send</button>
                </div>
            </div>
        </form>
    );
};


export default reduxForm({form: 'addMessageForm'})(AddMessageForm);
