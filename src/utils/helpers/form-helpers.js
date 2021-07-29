import {reset} from "redux-form";

/**
 * @param {string} formName
 */
export const onAfterSubmit = (formName) => (result, dispatch) => dispatch(reset(formName));
