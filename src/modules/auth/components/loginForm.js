import React from 'react';
import { Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginForm = ({ handleSubmit }) => {
  const [formState, setFormState] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form
      className="login-form validate-form"
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(formState.email, formState.password);
      }}
      noValidate
    >
      <span className="login-form-title">Costumer Sign in</span>
      <div className="input-wrap">
        <input className="textfield" name="email" placeholder="Email" value={formState.email} onChange={handleChange} />
        <span className="input-focus" />
        <span className="input-icon">
          <FontAwesomeIcon icon="envelope" />
        </span>
      </div>

      <div className="input-wrap">
        <input
          className="textfield"
          name="password"
          placeholder="Password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <span className="input-focus" />
        <span className="input-icon">
          <FontAwesomeIcon icon="lock" />
        </span>
      </div>

      <div className="pt-4">
        <button type="submit" className="login-btn" onClick={handleSubmit(formState.email, formState.password)}>
          <span>Sign In</span>
        </button>
      </div>
    </Form>
  );
};

export default LoginForm;
