import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const [serverError, setServerError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setServerError('');
      try {
        const { data } = await login(values);
        authLogin(data.user, data.token);
        navigate(data.user.role === 'admin' ? '/admin' : '/');
      } catch (err) {
        setServerError(err.response?.data?.message || 'Login failed');
      }
      setSubmitting(false);
    },
  });

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="shadow-sm border-0 rounded-4" style={{ width: '430px', padding: '24px' }}>
        <h3 className="text-center mb-4">Pizza Store</h3>
        <p className="text-center text-danger fw-bold mb-2">Welcome Back</p>
        <h5 className="text-center mb-4">Login</h5>

        {serverError && <Alert variant="danger">{serverError}</Alert>}

        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            variant="danger"
            type="submit"
            className="w-100 rounded-pill fw-bold shadow-sm"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/register" className="btn btn-danger rounded-pill px-4 fw-bold shadow-sm">
            Register
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
