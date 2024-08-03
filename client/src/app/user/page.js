'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { asyncCurrentUser, asyncUserSignout } from '@/store/Actions/userActions';
import NotificationBell from '../components/Notification';
import EnquiryForm from '../components/EnquiryForm';
import UserEnquiriesTable from '../components/UserEnquiriesTable';
import SearchFilter from '../components/SearchFilter';

export default function UserPanel() {
  const [notification, setNotification] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isUser, user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  
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

  const fetchEnquiries = async () => {
    const response = await axios.get('/api/enquiries/getAllEnquiries', {
      params: {
        page: currentPage,
        limit: 10, // Set limit for pagination
        search,
        status: statusFilter
      }
    });
    const data = response.data;
    setSubmissions(data?.enquiries);
    setTotalPages(Math.ceil(data.totalEnquiries / 10));
  };
  useEffect(() => {
    fetchEnquiries();
  }, [search, statusFilter, currentPage]);

  const handleNewSubmission = (newSubmission) => {
    setSubmissions(prevSubmissions => [...prevSubmissions, newSubmission]);
  };

  const handleLogout = () => {
    dispatch(asyncUserSignout());
    router.push('/');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Hi👋, Welcome Back {user?.username} !</h1>
        <div className="flex items-center space-x-4">
          <NotificationBell userId={user?._id} />
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
        </div>
      </div>
      {notification && <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded">
        {notification} 
        </div>}
      <EnquiryForm onSubmit={fetchEnquiries} notification={notification} setNotification={setNotification} />
      <SearchFilter search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      <UserEnquiriesTable submissions={submissions} />
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

