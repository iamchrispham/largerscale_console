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

import Logger from '../../shared/modules/logger';

const siteValidationSchema = {
  name: Yup.string()
    .min(3, 'Min 3 Characters!!')
    .max(50, 'Max 50 allowed')
    .required('Name Required'),
  organization: Yup.string().required('Organization not found'),
  user: Yup.string().required('User not found'),
};

const siteSchema = Yup.object().shape(siteValidationSchema);

const AddEditSite = ({ initialValues, addSite, updateSite }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  let user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    user = {};
  }

  const initializeForm = {
    name: initialValues.name || '',
    organization: user.organization ? user.organization._id : '',
    user: user._id,
  };

  return (
    <Formik
      initialValues={initializeForm}
      validationSchema={siteSchema}
      onSubmit={(values, actions) => {
        const callback = () => {
          actions.setSubmitting(false);
          setIsLoading(false);
        };
        setIsLoading(true);
        if (initialValues._id) {
          updateSite(values, initialValues._id, () => callback(), () => callback());
        } else {
          addSite(values, () => callback(), () => callback());
        }
      }}
    >
      {props => {
        const { values, isValid, isDirty, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = props;

        return (
          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <Row>
                <Col>
                  <b>User</b>: &nbsp; {user.name}
                </Col>
                <Col>
                  <b>Organization</b>: &nbsp; {user && !!user.organization && user.organization.name}
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
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
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              {isLoading ? (
                <Spinner />
              ) : (
                <Button type="submit" color="primary" size="sm" disabled={isSubmitting || !isValid || !!isDirty}>
                  {initialValues._id ? 'Update' : 'Add'} Site
                </Button>
              )}
            </ModalFooter>
          </Form>
        );
      }}
    </Formik>
  );
};

AddEditSite.defaultProps = {
  initialValues: {},
  addSite: license => Logger.info(license),
  updateSite: license => Logger.info(license),
};

export default AddEditSite;
