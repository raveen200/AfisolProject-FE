import * as yup from "yup";

export const FormSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    mobile: yup.string().required("Mobile is required"),
    countryId: yup.number().required("Country is required"),
    });