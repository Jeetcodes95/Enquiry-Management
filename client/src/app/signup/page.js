'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { asyncUserSignup } from '@/store/Actions/userActions';
import { useDispatch } from 'react-redux';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncUserSignup(formData))
      router.push('/login');
    } catch (err) {
      setError('Failed to sign up');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 border dark:border-gray-600 rounded shadow-2xl">
        <h2 className="text-2xl font-bold text-center dark:text-white">Sign Up</h2>
        {error && <div className="text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4 dark:bg-black">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border dark:bg-black dark:text-white border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border dark:bg-black border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border dark:bg-black dark:text-white border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border dark:bg-black dark:text-white border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-500 rounded">Sign Up</button>
        </form>
        <p className="text-sm text-center">
          Already have an account? <a href="/login" className="text-indigo-500">Log in</a>
        </p>
      </div>
    </div>
  );
}
