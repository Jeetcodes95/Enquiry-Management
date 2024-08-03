'use client';

import { asyncCurrentUser } from "@/store/Actions/userActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HomePage() {
  const router = useRouter();
  const { isUser, user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!isUser) {
      dispatch(asyncCurrentUser());
    } 
    if (user?.role === 'admin') {
      router.push('/admin');
    } else if (user?.role === 'user') {
      router.push('/user');
    } else {
      router.push('/');
    }
  }, [isUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-6xl border">
        <div className="w-1/2 p-8 flex flex-col items-center justify-center space-y-6">
          <h1 className="text-4xl font-bold text-center">Welcome to the Enquiry Management System</h1>
          <p className="text-center">Please log in or sign up to access the admin or user panel.</p>
          <div className="flex space-x-4">
            <Link href="/login" className="px-4 py-2 bg-indigo-500 dark:text-inherit text-white rounded">Login</Link>
            <Link href="/signup" className="px-4 py-2 bg-gray-500 dark:text-inherit text-white rounded">Sign Up</Link>
          </div>
        </div>

        <div className="w-1/2">
          <img src="/pics.png" alt="Description of the image" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
