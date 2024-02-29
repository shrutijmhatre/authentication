import * as yup from "yup";

const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  }

// yup schema for login
export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email address").required("Email is a required field"),
    password: yup.string().required("Password is a required field"),
  });

// yup schema for signup
export const signupSchema = yup.object().shape({
    username: yup.string().required("Name is a required field"),
    email: yup.string().email("Please enter a valid email address").required("Email is a required field"),
    password: yup.string().required("Password is a required field").min(8,'Password must contain minimum 8 characters').matches(/[a-zA-Z]/,getCharacterValidationError("letter")).matches(/[0-9]/, getCharacterValidationError("number")).matches(/\W/, getCharacterValidationError("special character")), 
  });