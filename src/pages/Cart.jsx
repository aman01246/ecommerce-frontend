import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const { setCount } = useContext(CartContext);

  //  normal function (no useCallback)
  const fetchCart = async () => {
    try {
      const res = await axios.get("/cart");
      setCart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadCart = async () => {
      try {
        const res = await axios.get("/cart");

        if (!ignore) {
          setCart(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadCart();

    return () => {
      ignore = true;
    };
  }, []);

  const removeItem = async (id) => {
    // 🔥 instant UI update
    setCart((prev) => prev.filter((item) => item.id !== id));
    setCount((prev) => prev - 1);

    try {
      await axios.delete(`/cart/${id}`);
    } catch (err) {
      console.error(err);
      fetchCart();
    }
  };

  const checkout = async () => {
    try {
      await axios.post("/orders/checkout");
      alert("Order placed successfully");
      setCart([]);
      setCount(0); // 🔥 important

      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8">🛒 Your Cart</h2>

        {!cart || cart.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-500">Start adding some projects 🚀</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm"
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.project.title}
                    </h3>
                    <p className="text-gray-500">₹{item.project.price}</p>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md h-fit sticky top-24">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>

              <div className="flex justify-between mb-2">
                <span>Total Items</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total Price</span>
                <span>
                  ₹
                  {cart.reduce(
                    (sum, item) => sum + item.project.price * item.quantity,
                    0,
                  )}
                </span>
              </div>

              <button
                onClick={checkout}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
