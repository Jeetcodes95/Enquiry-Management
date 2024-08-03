import React from 'react';

const SearchFilter = ({ search, setSearch, statusFilter, setStatusFilter }) => (
  <div className="mb-4">
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:text-black"
    />
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="ml-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:text-black"
    >
      <option value="">All Statuses</option>
      <option value="Pending">Pending</option>
      <option value="Accepted">Approved</option>
      <option value="Declined">Declined</option>
    </select>
  </div>
);

export default SearchFilter;
