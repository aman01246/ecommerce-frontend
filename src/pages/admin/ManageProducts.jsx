import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function ManageProducts() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    price: ""
  });

  // 🔄 Fetch
  const fetchProjects = async () => {
    try {
      const res = await axios.get("/projects");
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Safe effect (no warning)
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        const res = await axios.get("/projects");
        if (!ignore) {
          const data = Array.isArray(res.data) ? res.data : res.data.data;
          setProjects(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, []);

  // ❌ Delete
  const deleteProject = async (id) => {
     try {
    await axios.delete(`/projects/${id}`);
    fetchProjects();
  } catch (err) {
    console.error(err);

    // 🔥 show backend message
    alert(
      err.response?.data?.message || 
      "Cannot delete this product"
    );
  }
  };

  // ✏️ Start editing
  const startEdit = (p) => {
    setEditingId(p.id);
    setEditForm({
      title: p.title,
      price: p.price
    });
  };

  // 💾 Update
  const updateProject = async (id) => {
    try {
      await axios.put(`/projects/${id}`, editForm);
      setEditingId(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h2 className="text-3xl font-bold mb-8 text-indigo-600">
        Manage Products
      </h2>

      {projects.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {projects.map(p => (
            <div
              key={p.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >

              {editingId === p.id ? (
                <>
                  {/* EDIT MODE */}
                  <input
                    className="w-full border p-2 mb-2 rounded"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    className="w-full border p-2 mb-3 rounded"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateProject(p.id)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-300 px-4 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* VIEW MODE */}
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="text-gray-500 mb-4">₹{p.price}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(p)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProject(p.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  );
}