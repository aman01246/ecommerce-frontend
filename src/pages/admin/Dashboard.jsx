import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Dashboard() {

  const [stats, setStats] = useState({
    orders: 0,
    products: 0,
    revenue: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await axios.get("/admin/stats");
        setStats(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Orders</h3>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Products</h3>
          <p className="text-2xl font-bold">{stats.products}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Revenue</h3>
          <p className="text-2xl font-bold">₹{stats.revenue}</p>
        </div>

      </div>
    </div>
  );
}