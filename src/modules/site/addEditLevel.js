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
// import * as Yup from 'yup';

const AddEditLevel = ({ initialValues = {}, addLevel, updateLevel }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const initializeForm = {
    name: initialValues.name || '',
    plan: initialValues.plan,
  };

  return (
    <Formik
      initialValues={initializeForm}
      onSubmit={(values, actions) => {
        const callback = () => {
          actions.setSubmitting(false);
          setIsLoading(false);
        };
        setIsLoading(true);
        if (initialValues._id) {
          updateLevel(values, initialValues._id, () => callback(), () => callback());
        } else {
          addLevel(values, () => callback(), () => callback());
        }
      }}
    >
      {props => {
        const { values, isValid, isDirty, errors, handleSubmit, handleChange, handleBlur, isSubmitting } = props;
        return (
          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <Row>
                <Col md={4}>
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
                  <Input type="file" />
                </Col>
                <Col>
                  <div />
                  <img src="https://picsum.photos/500/400" alt="placeholder" />
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              {isLoading ? (
                <Spinner />
              ) : (
                <Button type="submit" color="primary" size="sm" disabled={isSubmitting || !isValid || !!isDirty}>
                  {initialValues._id ? 'Update' : 'Add'} Level
                </Button>
              )}
            </ModalFooter>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEditLevel;
