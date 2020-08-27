import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Redirect } from "react-router-dom";

import "./index.css";

const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    createUser(userInput: { email: $email, password: $password, name: $name }) {
      _id
      email
      name
    }
  }
`;

const GET_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const client = useApolloClient();
  const [redirect, setRedirect] = useState("");
  const { data: loggedInData } = useQuery(GET_LOGGED_IN);
  const [register, { data, error }] = useMutation(REGISTER, {
    onCompleted() {
      setRedirect("/login");
    }
  });
  useEffect(() => {
    if (loggedInData.isLoggedIn) setRedirect("/dashboard");
  }, [loggedInData]);

  const validate = values => {
    let errors: any = {};
    if (!values.email) {
      errors.email = "Email required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.name) {
      errors.name = "Name required";
    } else if (!/(\w.+\s).+/i.test(values.name)) {
      errors.name = "Full name required";
    }
    if (!values.password) {
      errors.password = "Password required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be greater than 6 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Must match password";
    }
    return errors;
  };

  if (redirect)
    return (
      <Redirect
        to={{
          pathname: redirect,
          state: { registered: true }
        }}
      />
    );

  return (
    <div className="login__container">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validate={validate}
        onSubmit={async values => {
          await new Promise(resolve => setTimeout(resolve, 200));
          try {
            const { data } = await register({
              variables: {
                name: values.name,
                email: values.email,
                password: values.password
              }
            });
          } catch (e) {
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <form className="login__inner-container" onSubmit={handleSubmit}>
            <span className="login__title">Register</span>
            {error && <span className="login__error">{error?.graphQLErrors[0]?.message}</span>}
            <span className="login__detail">
              {(errors.name && touched.name && errors.name) || "Name"}
            </span>
            <input
              placeholder="ex. Alex Jones"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <span className="login__detail">
              {(errors.email && touched.email && errors.email) || "Email address"}
            </span>
            <input
              type="email"
              placeholder="you@example.com"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <span className="login__detail">
              {(errors.password && touched.password && errors.password) ||
                "Password"}
            </span>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <span className="login__detail">
              {(errors.confirmPassword &&
                touched.confirmPassword &&
                errors.confirmPassword) ||
                "Confirm password"}
            </span>
            <input
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
            />
            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "REGISTERING" : "REGISTER"}
            </button>
            <Link className="sign-link" to="/login">
              Login
            </Link>
          </form>
        )}
      </Formik>
    </div>
  );
};
