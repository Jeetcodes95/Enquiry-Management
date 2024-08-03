import React from 'react';

const StatisticsBox = ({ title, value, backgroundColor, textColor }) => (
  <div className={`p-4 ${backgroundColor} ${textColor} rounded shadow`}>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl">{value}</p>
  </div>
);

export default StatisticsBox;
