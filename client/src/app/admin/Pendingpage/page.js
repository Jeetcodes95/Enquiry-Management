'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Pendingpage() {
  const [data, setData] = useState([]);

  const getEnquiriesByStatus = async () => {
    try {
      const response = await axios.get(`/api/enquiries/pendingEnq`);
      console.log(response);
      if (response.status === 200) {
        setData(response.data.pendingEnq);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  useEffect(() => {
    getEnquiriesByStatus();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Approved Enquiries</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100 border-b">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.status}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(item.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
