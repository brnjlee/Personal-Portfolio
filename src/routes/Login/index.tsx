import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useApolloClient, useMutation,useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { Toast } from "../../components/Toast";

import "./index.css";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      avatar
    }
  }
`;

const GET_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

interface LoginProps {
  location: any;
}

export const Login: React.FC<LoginProps> = ({ location }) => {
  const { data } = useQuery(GET_LOGGED_IN);
  const [redirect, setRedirect] = useState("");
  const client = useApolloClient();
  const [login, { error }] = useMutation(LOGIN, {
    onCompleted({login}) {
      localStorage.setItem("token", login.token as string);
      localStorage.setItem("userId", login.userId as string);
      localStorage.setItem("avatar", login.avatar as string);
      client.writeData({ data: { isLoggedIn: true } });
    }
  });

  const history = useHistory();

  useEffect(() => {
    if (data.isLoggedIn) setRedirect("/dashboard");
  }, [data]);

  useEffect(() => {
    return () => {
      if (location.state?.registered) {
        history.replace({ ...history.location, state: { registered: false } });
      }
    };
  }, []);

  if (redirect)
    return (
      <Redirect
        to={{
          pathname: redirect
        }}
      />
    );

  return (
    <div className="login__container">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={values => {
          let errors: any = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async values => {
          await new Promise(resolve => setTimeout(resolve, 200));
          try {
            const { data } = await login({ variables: values });
          } catch (e) {}
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
          /* and other goodies */
        }) => (
          <form className="login__inner-container" onSubmit={handleSubmit}>
            <span className="login__title">Log In</span>
            {error && (
              <span className="login__error">
                Your email or password are incorrect
              </span>
            )}
            <span className="login__detail">
              {(errors.email && touched.email && errors.email) ||
                "Email address"}
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

            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "LOGGING IN" : "LOG IN"}
            </button>
            <Link className="sign-link" to="/register">
              {"Not registered?"}
            </Link>
          </form>
        )}
      </Formik>
      {location.state?.registered && <Toast text={"Successfully registered"} />}
    </div>
  );
};
