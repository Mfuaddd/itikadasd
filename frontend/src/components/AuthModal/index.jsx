import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.scss";
import { tokenContext } from "../../contexts/TokenProvider";
import toast from "react-hot-toast";

const register = {
  first_name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  last_name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  phone_number: Yup.string(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Password is required"),
};
const login = {
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Password is required"),
};

function AuthModal({ toggleOpen }) {
  const [isLogin, setIsLogin] = useState(true);
  const { addToken, decode } = useContext(tokenContext);
  const [isError, setIsError] = useState(null);

  const authFetch = async (url, value) => {
    const res = await fetch(`http://localhost:3000/auth/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });
    const data = await res.json();
    if (!data.error) {
      addToken(data.token);
    } else {
      setIsError(data.error);
    }
    return !!data.error;
  };

  console.log(decode);

  return (
    <div className="auth-modal" onClick={toggleOpen}>
      <div className="auth-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="auth-modal__header">
          {isLogin ? <div>Login</div> : <div>Register</div>}

          <div className="auth-modal__close" onClick={toggleOpen}>
            &times;
          </div>
        </div>
        {isError && <div className="auth-modal__error">{isError}</div>}

        <Formik
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            password: "",
          }}
          validationSchema={Yup.object(isLogin ? login : register)}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
              const isError = authFetch(isLogin ? "login" : "register", values);
              !isError ? toggleOpen() : null;
            }, 400);
          }}
        >
          <Form className="auth-modal__body">
            {!isLogin ? (
              <div className="auth-modal__input">
                <Field name="first_name" type="text" placeholder="First Name" />
                <div className="auth-modal__error">
                  <ErrorMessage name="first_name" />
                </div>
              </div>
            ) : null}
            {!isLogin ? (
              <div className="auth-modal__input">
                <Field name="last_name" type="text" placeholder="Last Name" />
                <div className="auth-modal__error">
                  <ErrorMessage name="last_name" />
                </div>
              </div>
            ) : null}
            {!isLogin ? (
              <div className="auth-modal__input">
                <Field name="phone_number" type="text" placeholder="Mobile" />
                <div className="auth-modal__error">
                  <ErrorMessage name="phone_number" />
                </div>
              </div>
            ) : null}
            <div className="auth-modal__input">
              <Field name="email" type="email" placeholder="Email" />
              <div className="auth-modal__error">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div className="auth-modal__input">
              <Field name="password" type="password" placeholder="Password" />
              <div className="auth-modal__error">
                <ErrorMessage name="password" />
              </div>
            </div>
            {!isLogin ? (
              <div className="auth-modal__input">
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                <div className="auth-modal__error">
                  <ErrorMessage name="confirmPassword" />
                </div>
              </div>
            ) : null}

            <div className="auth-modal__submit">
              <button type="submit">{isLogin ? "Log In" : "Register"}</button>
            </div>
          </Form>
        </Formik>
        <div className="auth-modal__footer">
          {isLogin ? "New to iTicket.az?" : "Already registered?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {" "}
            Sign {isLogin ? "up now" : "in here"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
