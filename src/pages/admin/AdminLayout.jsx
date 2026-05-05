import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AdminLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="fixed top-0 left-0 h-screen w-64 bg-indigo-600 text-white flex flex-col justify-between overflow-y-auto">

        {/* TOP */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Admin</h2>

          <nav className="flex flex-col gap-4">
            <Link to="/admin" className="hover:bg-indigo-500 p-2 rounded">
              Dashboard
            </Link>

            <Link to="/admin/add" className="hover:bg-indigo-500 p-2 rounded">
              Add Product
            </Link>

            <Link to="/admin/manage" className="hover:bg-indigo-500 p-2 rounded">
              Manage Products
            </Link>
          </nav>
        </div>

        {/* 🔥 BOTTOM LOGOUT */}
        <div className="p-6 border-t border-indigo-400">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 ml-64 p-10 bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}