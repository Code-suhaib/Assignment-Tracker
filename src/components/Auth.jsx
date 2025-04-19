// src/components/Auth.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = formData;

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-3">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleAuth}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-3 text-center">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button className="btn btn-link p-0" onClick={() => setIsSignUp(false)}>Login</button>
            </p>
          ) : (
            <p>
              Don’t have an account?{' '}
              <button className="btn btn-link p-0" onClick={() => setIsSignUp(true)}>Sign Up</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
