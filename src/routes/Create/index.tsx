import React, {useEffect, useState, useCallback} from "react";
import {Formik} from "formik";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Redirect } from "react-router-dom";
import {useDropzone} from "react-dropzone";
import axios from "axios";

import "./index.css";

const CREATE_PLAN = gql`
  mutation CreatePlan($title: String!, $description: String!, $displayImageId: String) {
    createPlan(title: $title, description: $description, displayImageId: $displayImageId) {
      _id
      title
      description
      displayImageId
    }
  }
`;

const GET_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

interface CreateProps {}

export const Create: React.FC<CreateProps> = ({}) => {
  const [redirect, setRedirect] = useState("");
  const [displayImage, setDisplayImage] = useState(null);
  const onDrop = useCallback(acceptedFiles => {
    setDisplayImage(acceptedFiles[0]);
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  const { data: loggedInData } = useQuery(GET_LOGGED_IN);
  const [createPlan, { data, error }] = useMutation(CREATE_PLAN, {
    onCompleted() {
      setRedirect("/login");
    }
  });
  useEffect(() => {
    if (!loggedInData.isLoggedIn) setRedirect("/login");
  }, [loggedInData]);

  const validate = values => {
    let errors: any = {};
    if (!values.title) {
      errors.title = "Title required";
    }
    if (!values.description) {
      errors.description = "Description required";
    }
    return errors;
  };

  if (redirect)
    return (
      <Redirect
        to={{
          pathname: redirect
        }}
      />
    );

  return (
    <div className="create__container">
      <div className="create__header">
        <span className="header__title">Create</span>
      </div>
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        validate={validate}
        onSubmit={async values => {
          await new Promise(resolve => setTimeout(resolve, 200));
          try {
            let imageId = null;
            if(displayImage) {
              const formData = new FormData();
              formData.append('file', displayImage || "defaultId");
              formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET || "defaultId");

              const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                formData,
              );
              console.log(response);
              imageId = response.data.public_id;
            }
            const { data } = await createPlan({
              variables: {
                title: values.title,
                description: values.description,
                displayImageId: imageId
              }
            });
            console.log(data);
          } catch (e) {
            console.log(e)
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
          <form className="create__form" onSubmit={handleSubmit}>
            {error && <span className="login__error">{error?.graphQLErrors[0]?.message}</span>}
            <span className="login__detail">
              {(errors.title && touched.title && errors.title) || "Title"}
            </span>
            <input
              placeholder="ex. Snapchat"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <span className="login__detail">
              {(errors.description && touched.description && errors.description) || "Description"}
            </span>
            <input
              placeholder="Social media  app"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            <span className="login__detail">
              {(errors.description && touched.description && errors.description) || "Upload display image"}
            </span>
            <div className="create__dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              {/* {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
              } */}
              <div className="create__dropzone-details">
            {displayImage? <p>Image selected</p> : <p>Drag and Drop image or Click to select files</p> }
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "CREATING" : "CREATE"}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
