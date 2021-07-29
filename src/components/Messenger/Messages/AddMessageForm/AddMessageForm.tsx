import * as React from "react";
import s from "./AddMessageForm.module.css"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {FormControl} from "../../../common/FormsControls/FormControls";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {onAfterSubmit} from "../../../../utils/helpers/form-helpers";

const maxLength100 = maxLengthCreator(100);
const Textarea = FormControl("textarea");

type FormDataType = {
    newMessageBody: string,

};

type PropsType = {
    isDisableSubmit?: boolean
};

const AddMessageForm: React.FC<InjectedFormProps<FormDataType, PropsType> & PropsType>
    = ({handleSubmit, isDisableSubmit = false}) => {
    return (
        <form className={s.messageCreator} onSubmit={handleSubmit}>
            <div className={s.messageCreatorWrapper}>
                <div className="form-group">
                    <Field name="newMessageBody"
                           component={Textarea}
                           validate={[required, maxLength100]}
                           />
                </div>
                <div className="form-group justify-content-end">
                    <button className="btn-custom__accent" disabled={isDisableSubmit}>Send</button>
                </div>
            </div>
        </form>
    );
};

const FORM_NAME = 'addMessageForm';
export default reduxForm<FormDataType, PropsType>({
    form: FORM_NAME,
    onSubmitSuccess: onAfterSubmit(FORM_NAME),
})(AddMessageForm);
