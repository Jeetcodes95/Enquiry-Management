'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCurrentUser, asyncUserSignin } from '@/store/Actions/userActions';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { isUser, user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    if (!isUser) {
      dispatch(asyncCurrentUser());
    } else {
      if (user?.role === 'admin') {
        router.push('/admin');
      } else if (user?.role === 'user') {
        router.push('/user');
      } else {
        router.push('/');
      }
    }
  }, [isUser]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(asyncUserSignin( {email, password}));
      console.log(response);
      if (response.data.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-6 dark:bg-black dark:text-white border rounded shadow-2xl">
        <h2 className="text-2xl font-bold text-center dark:text-white">Login</h2>
        {error && <div className="text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border dark:bg-black dark:text-white border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border dark:bg-black dark:text-white border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-500 rounded">Login</button>
        </form>
        <p className="text-sm text-center">
          Don't have an account? <a href="/signup" className="text-indigo-500">Sign up</a>
        </p>
      </div>
    </div>
  );
}
