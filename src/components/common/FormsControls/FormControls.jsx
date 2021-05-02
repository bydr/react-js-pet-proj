import React from "react";
import styles from "./FormControls.module.css"

export const FormControl = Control => ({input, meta: {touched, error}, ...props}) => {
    const hasError = touched && error;

    return (
        <div className={`${styles.formGroup} ${ hasError ? styles.error : ''}`}>
            <Control className={styles.formControl} {...input} {...props} />
            {
                hasError
                    ?
                    <div className={styles.formGroupErrors}>
                        <p>{error}</p>
                    </div>
                    : ''
            }
        </div>
    );
};
