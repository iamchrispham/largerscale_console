import React, { useState, useEffect } from 'react';
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

import Logger from '../../../shared/modules/logger';
import ErrorContext from '../../../shared/modules/error/context';
import { getOrganizations } from '../../../shared/services/organization';
import { getRoles, ROLES } from '../../../shared/services/role';

const withPassword = {
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .max(50, 'Password is too long - should be 50 chars maximum.')
    .required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
};

const userValidation = {
  name: Yup.string()
    .min(5, 'Min 5 Characters!!')
    .max(50, 'Max 50 allowed')
    .required('Name Required'),

  email: Yup.string()
    .email('Must be a valid URL')
    .required('Email is required'),
  organization: Yup.string().required('Please select a organization'),
  role: Yup.string().required('Please select a role'),
};

const userSchema = Yup.object().shape(userValidation);

const newUserSchema = Yup.object().shape({
  ...userValidation,
  ...withPassword,
});

const AddEditOrganizations = ({ initialValues, addUser, updateUser }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = useState({
    loading: false,
    organizations: [],
    roles: [],
  });
  const { setError } = React.useContext(ErrorContext);

  useEffect(() => {
    const fetchData = async () => {
      setData(d => ({
        ...d,
        loading: true,
      }));
      try {
        const organizations = await getOrganizations();
        const roles = await getRoles();

        setData({
          organizations,
          roles,
          loading: false,
        });
      } catch (e) {
        setError(e, true);
        setData({
          organizations: [],
          roles: [],
          loading: false,
        });
      }
    };
    fetchData();
  }, [setData, setError]);

  if (data.loading) {
    return (
      <ModalBody style={{ textAlign: 'center ' }}>
        <Spinner />
        <br />
        <br />
        Loading Roles/Organizations...
      </ModalBody>
    );
  }

  const initializeForm = {
    name: initialValues.name || '',
    email: initialValues.email || '',
    password: '',
    confirmPassword: '',
    role: initialValues.role ? initialValues.role._id : '',
    organization: initialValues.organization ? initialValues.organization._id : '',
  };

  if (initialValues._id) {
    delete initializeForm.password;
    delete initializeForm.confirmPassword;
  }

  return (
    <Formik
      initialValues={initializeForm}
      validationSchema={initialValues._id ? userSchema : newUserSchema}
      onSubmit={(values, actions) => {
        const callback = () => {
          actions.setSubmitting(false);
          setIsLoading(false);
        };
        setIsLoading(true);
        if (initialValues._id) {
          updateUser(values, initialValues._id, () => callback(), () => callback());
        } else {
          addUser(values, () => callback(), () => callback());
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
                <Col>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      invalid={!!errors.email}
                      tag={Field}
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <ErrorMessage name="email" component="div">
                      {errorMessage => <FormFeedback>{errorMessage}</FormFeedback>}
                    </ErrorMessage>
                  </FormGroup>
                </Col>
              </Row>
              {!initialValues._id && (
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        invalid={!!errors.password}
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
                    <FormGroup>
                      <Label for="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="confirmPassword"
                        invalid={!!errors.confirmPassword}
                        tag={Field}
                        name="confirmPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                      />
                      <ErrorMessage name="confirmPassword" component="div">
                        {errorMessage => <FormFeedback>{errorMessage}</FormFeedback>}
                      </ErrorMessage>
                    </FormGroup>
                  </Col>
                </Row>
              )}

              <Row>
                <Col>
                  <FormGroup>
                    <Label for="role">Role</Label>
                    <Input
                      type="select"
                      name="role"
                      id="role"
                      invalid={!!errors.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.role}
                    >
                      <option>None</option>
                      {data.roles.map(role => (
                        <option key={role._id} value={role._id} disabled={role.key === ROLES.GOD}>
                          {role.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="organization">Organization</Label>
                    <Input
                      type="select"
                      name="organization"
                      id="organization"
                      invalid={!!errors.organization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.organization}
                    >
                      <option>None</option>
                      {data.organizations.map(organization => (
                        <option key={organization._id} value={organization._id}>
                          {organization.name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              {isLoading ? (
                <Spinner />
              ) : (
                <Button type="submit" color="primary" size="sm" disabled={isSubmitting || !isValid || !!isDirty}>
                  {initialValues._id ? 'Update' : 'Add'} User
                </Button>
              )}
            </ModalFooter>
          </Form>
        );
      }}
    </Formik>
  );
};

AddEditOrganizations.defaultProps = {
  initialValues: {},
  addUser: license => Logger.info(license),
  updateUser: license => Logger.info(license),
};

export default AddEditOrganizations;
