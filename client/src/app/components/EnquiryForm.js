import { useState } from 'react';
import axios from 'axios';

export default function EnquiryForm({ onSubmit, notification, setNotification }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/enquiries/create', { title, description });
      if (res.status === 201) {
        setTitle('');
        setDescription('');
        setNotification('Enquiry submitted successfully!');
        onSubmit(); 
      }
    } catch (error) {
      setNotification('Failed to submit enquiry');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-3 bg-gray-200 dark:bg-inherit p-3 rounded" >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-inherit "
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-inherit"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-500 text-white rounded"
      >
        Submit Enquiry
      </button>
    </form>
  );
}
