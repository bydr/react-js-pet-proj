export const required = (value) => {
    if (value) return undefined;

    return "Field is required!";
};

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length <= maxLength) return undefined;

    return `Fields length more then ${maxLength} symbols`;
};
