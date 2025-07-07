import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else if (data && data.user) {
        // Fetch user profile to get role
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
        if (profileError) {
          setError('Could not fetch user role.');
        } else {
          // Redirect based on role
          if (profile.role === 'admin') {
            navigate('/admin-dashboard');
          } else if (profile.role === 'staff') {
            navigate('/staff-dashboard');
          } else {
            navigate('/dashboard'); // patient or default
          }
        }
      }
    } catch (err: any) {
      setError('An unexpected error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-blue-100">
        {/* Logo area */}
        <div className="mb-6 flex flex-col items-center">
          <svg className="w-14 h-14 text-blue-600 mb-2" fill="none" viewBox="0 0 48 48" stroke="currentColor">
            <circle cx="24" cy="24" r="22" strokeWidth="3" className="text-blue-200" fill="#e0f2fe" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 32c0-8 16-8 16 0" className="text-blue-500" />
            <ellipse cx="24" cy="20" rx="7" ry="5" className="text-blue-400" fill="#38bdf8" />
          </svg>
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight mb-1">Dental Office Portal</h1>
          <span className="text-gray-500 text-sm">Sign in to manage your practice</span>
        </div>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="you@dentaloffice.com"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
            <input
              id="password"
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12 transition"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-xs text-blue-500 hover:underline focus:outline-none"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm">
              <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
            </div>
            <div className="text-sm">
              <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center -mt-2">{error}</div>}
          <button
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-md transition disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
      <footer className="mt-8 text-gray-400 text-xs">&copy; {new Date().getFullYear()} Dental SaaS. All rights reserved.</footer>
    </div>
  );
};

export default LoginPage;