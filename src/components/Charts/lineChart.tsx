import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const SimpleLineChart = ({ data }: any) => {
  const applications: any = {}; // Object to store application data

  // Group data by application
  data.forEach((item: any) => {
    Object.keys(item).forEach((key) => {
      if (key !== "name") {
        if (!applications[key]) {
          applications[key] = [];
        }
        applications[key].push({ name: item.name, [key]: item[key] });
      }
    });
  });

  const applicationKeys = Object.keys(applications);

  return (
    <LineChart
      width={500}
      height={200}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      {applicationKeys.map((key, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey={key}
          data={applications[key]}
          stroke={
            key === "tic-tac-toc"
              ? "#8884d8"
              : key === "sudoku"
              ? "#82ca9d"
              : "#ffc658"
          }
          dot={false}
        />
      ))}
    </LineChart>
  );
};

export default SimpleLineChart;
