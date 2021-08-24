// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {TFilterUsers, TFriend} from "../../../types/types";


type PropsType = {
    onSubmit: (filter: TFilterUsers) => Promise<boolean>;
};

const UsersSearchForm: React.FC<PropsType> = ({onSubmit}) => {

    const submit = async (values: TFilterUsers, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void }) => {
        let isSubmit = await onSubmit({
            term: values.term,
            friend: values.friend
        });
        if (isSubmit) {
            setSubmitting(false);
        }
    };

    return <div>
        <h1>Any place in your app!</h1>
        <Formik
            initialValues={{term: '', friend: 'null'}}
            onSubmit={submit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    </div>
};

export default UsersSearchForm;
