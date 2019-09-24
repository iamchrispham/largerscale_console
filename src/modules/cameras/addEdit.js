import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ModalFooter,
  ModalBody,
  FormFeedback,
  Spinner,
} from 'reactstrap';
import * as Yup from 'yup';
import styled from 'styled-components';

const cameraSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Min 3 Characters!!')
    .max(15, 'Max 15 allowed')
    .required('Name Required'),
  ip: Yup.string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'Should be a valid IP'
    )
    .required('IP Required'),
  username: Yup.string().required('Username Required'),
  password: Yup.string().required('Password Required'),
});

const CameraPlaceholder = styled.div`
  display: block;
  width: 100%;
  height: 285px;
  background: grey;
  padding: 33% 23%;
  font-size: 25px;
`;

const AddEditCamera = ({ initialValues = {}, updateCamera, addCamera }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <Formik
      initialValues={{
        name: initialValues.name || '',
        type: initialValues.type || 'hd',
        ip: initialValues.ip || '',
        username: initialValues.username || '',
        password: initialValues.password || '',
      }}
      validationSchema={cameraSchema}
      onSubmit={(values, actions) => {
        const callback = () => {
          actions.setSubmitting(false);
          setIsLoading(false);
        };
        setIsLoading(true);
        if (initialValues._id) {
          updateCamera(values, initialValues._id, () => callback(), () => callback());
        } else {
          addCamera(values, () => callback(), () => callback());
        }
      }}
    >
      {props => {
        const { values, isValid, isDirty, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      invalid={!!errors.name}
                      id="name"
                      tag={Field}
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <ErrorMessage name="name" component="div">
                      {errorMessage => <FormFeedback>{errorMessage}</FormFeedback>}
                    </ErrorMessage>
                  </FormGroup>

                  <FormGroup>
                    <Label for="ip">IP</Label>
                    <Input
                      invalid={!!errors.ip}
                      id="ip"
                      tag={Field}
                      name="ip"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ip}
                    />
                    <ErrorMessage name="ip" component="div">
                      {errorMessage => <FormFeedback>{errorMessage}</FormFeedback>}
                    </ErrorMessage>
                  </FormGroup>

                  <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                      invalid={!!errors.username}
                      id="username"
                      tag={Field}
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    <ErrorMessage name="username" component="div">
                      {errorMessage => <FormFeedback>{errorMessage}</FormFeedback>}
                    </ErrorMessage>
                  </FormGroup>

                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      invalid={!!errors.password}
                      id="password"
                      tag={Field}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <ErrorMessage name="password" component="div">
                      {errorMessage => <FormFeedback>{errorMessage}</FormFeedback>}
                    </ErrorMessage>
                  </FormGroup>
                </Col>
                <Col>
                  <CameraPlaceholder>Camera Preview</CameraPlaceholder>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              {isLoading ? (
                <Spinner />
              ) : (
                <Button type="submit" color="primary" size="sm" disabled={isSubmitting || !isValid || !!isDirty}>
                  {initialValues._id ? 'Update' : 'Connect'} Camera
                </Button>
              )}
            </ModalFooter>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEditCamera;
