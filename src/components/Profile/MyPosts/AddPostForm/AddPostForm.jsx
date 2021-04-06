import React from "react";
import {Field, reduxForm} from "redux-form";

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <Field placeholder="Введите текст..."
                       className="form-control"
                       name="postMessage"
                       component="textarea"
                       rows="5" />
            </div>
            <div className="form-group justify-content-end">
                <button className="drButton">Send</button>
            </div>
        </form>
    );
};

const AddPostReduxForm = reduxForm({form: 'dialogAddPostForm'})(AddPostForm);

export default AddPostReduxForm;
