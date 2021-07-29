import React from "react";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {FormControl} from "../../../common/FormsControls/FormControls";
import {reduxForm, Field, reset} from "redux-form";
import {onAfterSubmit} from "../../../../utils/helpers/form-helpers";

const maxLength10 = maxLengthCreator(10);
const Textarea = FormControl("textarea");
const FORM_NAME = 'dialogAddPostForm';

const AddPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder="Введите текст..."
                   name="postMessage"
                   component={Textarea}
                   validate={[required, maxLength10]}
                   value={props.newPostText}
                   rows="5" />
            <div className="form-group justify-content-end">
                <button className="btn-custom__accent">Send</button>
            </div>
        </form>
    );
};



export default reduxForm({
    form: FORM_NAME,
    onSubmitSuccess: onAfterSubmit(FORM_NAME),
})(AddPostForm);
