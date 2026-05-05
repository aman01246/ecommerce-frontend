import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Download() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/user/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Your Purchases</h2>

      {projects.map(p => (
        <div key={p.id} className="border p-4 mb-3 flex justify-between">
          <span>{p.title}</span>

          <a
            href={`http://localhost:8090/download/${p.id}`}
            className="text-indigo-600"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
}