import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import axios from "../api/axios";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);
  const { count, setCount } = useContext(CartContext);

  // ✅ logout
  const handleLogout = () => {
    logout(); // already clears localStorage
    setCount(0); // reset cart count
    navigate("/login");
  };

  // ✅ load cart once (or when user changes)
  useEffect(() => {
    if (!user) return;

    const loadCart = async () => {
      try {
        const res = await axios.get("/cart");
        setCount(res.data.data?.length || 0);
      } catch (err) {
        console.log("Cart fetch skipped"+err);
      }
    };

    loadCart();
  }, [user]); // 🔥 IMPORTANT

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md shadow-md">

      <h1 className="text-xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}>
        DevStore
      </h1>

      <div className="flex items-center gap-6">

        <Link to="/" className="hover:text-indigo-600 transition">
          Home
        </Link>

        {user ? (
          <>
            <Link to="/cart" className="relative hover:text-indigo-600">

              Cart

              {/* 🔥 badge */}
              {count > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-indigo-600">
              Login
            </Link>

            <Link to="/register" className="hover:text-indigo-600">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}