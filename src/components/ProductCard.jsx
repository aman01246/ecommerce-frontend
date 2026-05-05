import axios from "../api/axios";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ project }) {
  console.log("PROJECT:", project);
  const { setCount } = useContext(CartContext);

  const addToCart = async () => {
    try {
      await axios.post(`/cart/add/${project.id}`);

      // 🔥 update navbar instantly
      setCount((prev) => prev + 1);
      alert("Added to cart");
    } catch (err) {
      alert("Login required" + err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between">
      {/* IMAGE PLACEHOLDER */}
      <img
        src={project.imageUrl || "https://via.placeholder.com/300"}
        alt={project.title}
        className="h-40 w-full object-cover rounded-xl mb-4"
      />

      {/* TITLE */}
      <h3 className="text-lg font-bold mb-2">{project.title}</h3>

      {/* PRICE */}
      <p className="text-indigo-600 font-semibold text-xl mb-4">
        ₹{project.price}
      </p>

      {/* BUTTON */}
      <button
        onClick={addToCart}
        className="mt-auto bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
