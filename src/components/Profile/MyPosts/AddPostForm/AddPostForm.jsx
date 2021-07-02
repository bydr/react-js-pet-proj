import React from "react";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {FormControl} from "../../../common/FormsControls/FormControls";

const maxLength10 = maxLengthCreator(10);
const Textarea = FormControl("textarea");

const AddPostForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder="Введите текст..."
                   name="postMessage"
                   component={Textarea}
                   validate={[required, maxLength10]}
                   rows="5" />
            <div className="form-group justify-content-end">
                <button className="btn-custom__accent">Send</button>
            </div>
        </form>
    );
};


export default reduxForm({form: 'dialogAddPostForm'})(AddPostForm);
