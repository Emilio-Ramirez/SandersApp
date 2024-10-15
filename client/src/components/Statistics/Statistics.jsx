import React from 'react';
import { Bar, XAxis, YAxis, BarChart} from 'recharts'; 

const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
];

const Statistics = () => (
  <BarChart width={500} height={300} data={data}>
    <XAxis dataKey="name" />
    <YAxis />
    <Bar dataKey="uv" fill="#8884d8" />
  </BarChart>
);

export default Statistics;
