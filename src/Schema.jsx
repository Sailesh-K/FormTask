import * as yup from 'yup';

const basicSchema=yup.object().shape({
    title: yup.string().required("Required"),
    author: yup.string().required("Required"),
    isbn: yup.number("Invalid").positive().required("Required"),
    pubdate: yup.date().required("Required")
});

export default basicSchema;