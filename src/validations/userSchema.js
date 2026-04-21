import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number()
    .min(0, "Age must be a positive number")
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer"),
});
