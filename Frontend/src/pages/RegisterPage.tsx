import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }
      // Insert into profiles table with role 'patient'
      const user = data.user;
      if (user) {
        const { error: profileError } = await supabase.from('profiles').insert([
          { id: user.id, email, role: 'patient' }
        ]);
        if (profileError) {
          setError('Profile creation failed: ' + profileError.message);
          setLoading(false);
          return;
        }
      }
      setSuccess('Registration successful! Please check your email to confirm your account.');
      setTimeout(() => navigate('/'), 2000);
    } catch (err: any) {
      setError('An unexpected error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-blue-100">
        <div className="mb-6 flex flex-col items-center">
          <svg className="w-14 h-14 text-blue-600 mb-2" fill="none" viewBox="0 0 48 48" stroke="currentColor">
            <circle cx="24" cy="24" r="22" strokeWidth="3" className="text-blue-200" fill="#e0f2fe" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 32c0-8 16-8 16 0" className="text-blue-500" />
            <ellipse cx="24" cy="20" rx="7" ry="5" className="text-blue-400" fill="#38bdf8" />
          </svg>
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight mb-1">Create Your Account</h1>
          <span className="text-gray-500 text-sm">Sign up as a patient</span>
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="you@email.com"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center -mt-2">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center -mt-2">{success}</div>}
          <button
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-md transition disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/" className="text-blue-500 hover:underline">Sign in</a>
        </div>
      </div>
      <footer className="mt-8 text-gray-400 text-xs">&copy; {new Date().getFullYear()} Dental SaaS. All rights reserved.</footer>
    </div>
  );
};

export default RegisterPage;
