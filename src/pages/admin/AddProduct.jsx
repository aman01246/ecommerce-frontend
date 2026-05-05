import { useState } from "react";
import axios from "../../api/axios";

export default function AddProduct() {

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    fileUrl: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 CLOUDINARY UPLOAD
  const uploadImage = async () => {
    if (!imageFile) return "";

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ecommerce_upload"); // your preset

    try {
      setUploading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/duothybz0/image/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();
      setUploading(false);

      return data.secure_url;

    } catch (err) {
      console.error(err);
      setUploading(false);
      return "";
    }
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadImage();
      }

      await axios.post("/projects", {
        ...form,
        imageUrl, // 🔥 from cloudinary
        price: Number(form.price)
      });

      alert("Product added successfully ✅");

      // reset
      setForm({
        title: "",
        description: "",
        price: "",
        fileUrl: ""
      });
      setImageFile(null);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-[400px]"
      >

        <h2 className="text-2xl font-bold mb-6 text-indigo-600">
          Add New Product
        </h2>

        {/* TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          rows={3}
          required
        />

        {/* PRICE */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        {/* FILE URL */}
        <input
          type="text"
          name="fileUrl"
          placeholder="Download File URL"
          value={form.fileUrl}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full mb-4"
        />

        {/* PREVIEW */}
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="preview"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}