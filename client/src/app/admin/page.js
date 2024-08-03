'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCurrentUser, asyncUserSignout } from '@/store/Actions/userActions';
import StatisticsBox from '@/app/components/StatisticsBox';
import SearchFilter from '@/app/components/SearchFilter';
import EnquiriesTable from '@/app/components/EnquiriesTable';
import Link from 'next/link';

export default function AdminPanel() {
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({
    totalApproved: 0,
    totalDeclined: 0,
    totalPending: 0,
    totalOnHold: 0,
    totalEnquiries: 0
  });
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
  }, [isUser, user, dispatch, router]);

  const fetchEnquiries = async () => {
    const response = await axios.get('/api/enquiries/getAllEnquiries', {
      params: {
        page: currentPage,
        limit: 10,
        search,
        status: statusFilter
      }
    });
    const data = response.data;
    setEnquiries(data?.enquiries);
    setStats({
      totalApproved: data.totalApproved,
      totalDeclined: data.totalDeclined,
      totalPending: data.totalPending,
      totalOnHold: data.totalOnHold,
      totalEnquiries: data.totalEnquiries
    });
    setTotalPages(Math.ceil(data.totalEnquiries / 10));
  };

  useEffect(() => {
    fetchEnquiries();
  }, [search, statusFilter, currentPage]);

  const handleAction = async (id, status) => {
    await axios.patch(`/api/enquiries/updateStatus/${id}`, { status });
    setEnquiries(enquiries.map(enquiry => (enquiry._id === id ? { ...enquiry, status } : enquiry)));
    await fetchEnquiries();
  };

  const handleLogout = () => {
    dispatch(asyncUserSignout());
    router.push('/');
  };

  

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Hi👋, Welcome Back {user?.username} !</h1>
       
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Link href="/admin/Approvedpage"><StatisticsBox title="Approved" value={stats.totalApproved} backgroundColor="bg-green-100" textColor="text-green-700" /></Link>
        <Link href="/admin/Declinedpage"><StatisticsBox title="Declined" value={stats.totalDeclined} backgroundColor="bg-red-100" textColor="text-red-700" /></Link>
        <Link href="/admin/Pendingpage"> <StatisticsBox title="Pending" value={stats.totalPending} backgroundColor="bg-yellow-100" textColor="text-yellow-700" /></Link>
        <StatisticsBox title="Total Enquiries" value={stats.totalEnquiries} backgroundColor="bg-gray-100" textColor="text-gray-700" />
      </div>
      <SearchFilter search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      <EnquiriesTable enquiries={enquiries} handleAction={handleAction} />
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

