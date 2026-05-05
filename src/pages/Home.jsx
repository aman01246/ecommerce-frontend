import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await axios.get("/projects");
        const data = Array.isArray(res.data) ? res.data : res.data.data;
        setProjects(data);
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />

      {/* HERO */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 py-28 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">

        {/* Glow */}
        <div className="absolute w-[500px] h-[500px] bg-white opacity-10 rounded-full blur-3xl top-[-100px] left-[-100px]" />

        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Discover & Buy <br />
          <span className="text-yellow-300">Premium Projects 🚀</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-2xl text-gray-100">
          Explore high-quality development projects and download instantly after purchase.
        </p>

        {/* 👇 Hide buttons if logged in */}
        {!user && (
          <div className="flex gap-4">
            <Link to="/register">
              <button className="bg-white text-black px-7 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
                Get Started
              </button>
            </Link>

            <Link to="/login">
              <button className="border border-white px-7 py-3 rounded-xl hover:bg-white hover:text-black transition">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* FEATURES */}
      <div className="py-20 px-8 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          {
            title: "⚡ Instant Download",
            desc: "Get access to projects immediately after purchase."
          },
          {
            title: "🔒 Secure Payments",
            desc: "Safe and reliable checkout system."
          },
          {
            title: "💎 Premium Quality",
            desc: "Curated high-quality development projects."
          }
        ].map((f, i) => (
          <div
            key={i}
            className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
          >
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* PRODUCTS */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-indigo-600">
          All Projects
        </h2>

        {/* 🔄 Loading */}
        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading projects...
          </div>
        )}

        {/* ❌ Empty */}
        {!loading && projects.length === 0 && (
          <div className="text-center text-gray-500">
            No projects available
          </div>
        )}

        {/* ✅ Products */}
        {!loading && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {projects.map(p => (
              <ProductCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}