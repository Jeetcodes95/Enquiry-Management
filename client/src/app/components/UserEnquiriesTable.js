import React from 'react';
import { CheckCircleIcon, ClockIcon,  } from '@heroicons/react/outline';

const UserEnquiriesTable = ({ submissions }) => (
  <table className="min-w-full mt-4">
    <thead className='text-left bg-slate-100 dark:text-black'>
      <tr>
        <th className="py-1 px-4 border-b">SL</th>
        <th className="py-1 px-4 border-b">Date</th>
        <th className="py-1 px-4 border-b">Title</th>
        <th className="py-1 px-4 border-b">Description</th>
        <th className="py-1 px-4 border-b text-center">Status</th>
      </tr>
    </thead>
    <tbody>
      {submissions.map((enquiry, index) => (
        <tr key={enquiry._id}>
          <td className="py-1 px-4 border-b">{index+1}.</td>
          <td className="py-1 px-4 border-b">{new Date(enquiry?.createdAt).toLocaleDateString()}</td>
          <td className="py-1 px-4 border-b">{enquiry.title}</td>
          <td className="py-1 px-4 border-b">{enquiry.description}</td>
          <td className="py-1 px-4 border-b">
            {enquiry.status === 'Pending' && (
              <div className="flex items-center justify-end space-x-2">
                <span className="text-gray-500 dark:text-white">
                  {enquiry.status === 'Accepted' ? 'Approved' : enquiry.status}
                </span>
                {enquiry.status === 'Pending' && (
                  <ClockIcon className="w-6 h-6 text-orange-400 dark:text-orange-200" />
                )}
              </div>
            )}
            {enquiry.status !== 'Pending' && (
              <div className="flex items-center justify-end space-x-2">
                <span className="text-gray-500 dark:text-white">
                  {enquiry.status === 'Accepted' ? 'Approved' : enquiry.status}
                </span>
                {enquiry.status === 'Accepted' && (
                  <CheckCircleIcon className="w-6 h-6 text-green-800 dark:text-green-200" />
                )}
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserEnquiriesTable;
