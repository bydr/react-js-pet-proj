import React from "react";
import styles from "./FormControls.module.css"

export const FormControl = Control => ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;

    return (
        <div className={`${styles.formGroup} ${ hasError ? styles.error : ''}`}>
            <Control className={styles.formControl} {...input} {...props} />
            {
                hasError
                    ?
                    <div className={styles.formGroupErrors}>
                        <p>{meta.error}</p>
                    </div>
                    : ''
            }
        </div>
    );
};
