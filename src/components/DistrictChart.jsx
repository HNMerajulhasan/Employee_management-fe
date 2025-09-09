import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function DistrictChart({ employees }) {
  const data = employees.reduce((acc, emp) => {
    const found = acc.find((item) => item.district === emp.district);
    if (found) found.count++;
    else acc.push({ district: emp.district, count: 1 });
    return acc;
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Employees per District</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="district" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
