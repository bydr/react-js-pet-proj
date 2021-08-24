import React from "react";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {FormControl} from "../../../common/FormsControls/FormControls";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {onAfterSubmit} from "../../../../utils/helpers/form-helpers";

const maxLength10 = maxLengthCreator(10);
const Textarea = FormControl("textarea");
const FORM_NAME = 'dialogAddPostForm';

type AddPostFormValuesType = {
    postMessage: string
};


const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType>>
    = ({handleSubmit}) => {

    return (
        <form onSubmit={handleSubmit}>
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



export default reduxForm<AddPostFormValuesType>({
    form: FORM_NAME,
    onSubmitSuccess: onAfterSubmit(FORM_NAME),
})(AddPostForm);
