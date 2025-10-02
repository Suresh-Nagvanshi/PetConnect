import React, { useState, useEffect } from "react";

function VetListServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Fetch services error:", err));
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      setImagePreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    if (!form.name.trim() || !form.price.trim()) {
      setError("Name and Price are required.");
      return false;
    }
    if (isNaN(form.price) || Number(form.price) <= 0) {
      setError("Price must be a positive number.");
      return false;
    }
    if (form.duration && (isNaN(form.duration) || Number(form.duration) <= 0)) {
      setError("Duration must be a positive number.");
      return false;
    }
    return true;
  };

  const addService = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    if (form.duration) formData.append("duration", form.duration);
    if (form.description) formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    // Attach the vet id from localStorage
    const vet = JSON.parse(localStorage.getItem('vet')) || JSON.parse(localStorage.getItem('seller'));
    if (!vet || !vet._id) {
      setError("Vet ID not found. Please login again.");
      return;
    }
    formData.append("vetId", vet._id);

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add service");
      }
      const savedService = await res.json();
      setServices([...services, savedService]);
      setForm({
        name: "",
        price: "",
        duration: "",
        description: "",
        image: null,
      });
      setImagePreview(null);
      setSuccess("Service added successfully!");
      setError("");
    } catch (error) {
      setError(error.message || "Error adding service");
      setSuccess("");
    }
  };

  const deleteService = (id) => {
    setServices(services.filter((s) => s._id !== id));
  };

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      duration: "",
      description: "",
      image: null,
    });
    setImagePreview(null);
    setError("");
    setSuccess("");
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold">List Services</h1>
        <p className="text-blue-100 mt-1">Add vet care services you provide.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form
          onSubmit={addService}
          className="lg:col-span-1 backdrop-blur-md bg-white/90 rounded-2xl p-6 border border-white/30 shadow"
        >
          <h2 className="text-xl font-semibold mb-4">New Service</h2>
          {error && <div className="mb-3 text-red-600">{error}</div>}
          {success && <div className="mb-3 text-green-600">{success}</div>}

          <label className="block text-sm mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Vaccination"
            className="w-full mb-3 rounded-lg border border-gray-300 p-3"
          />

          <label className="block text-sm mb-1">Price (₹)</label>
          <input
            name="price"
            type="number"
            min="1"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 500"
            className="w-full mb-3 rounded-lg border border-gray-300 p-3"
          />

          <label className="block text-sm mb-1">Duration (minutes)</label>
          <input
            name="duration"
            type="number"
            min="1"
            value={form.duration}
            onChange={handleChange}
            placeholder="e.g. 30"
            className="w-full mb-3 rounded-lg border border-gray-300 p-3"
          />

          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Service details"
            className="w-full mb-4 rounded-lg border border-gray-300 p-3"
          />

          <label className="block text-sm mb-1">Clinic Photo</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full mb-4 rounded-lg border border-gray-300 p-3"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Clinic preview"
              className="mb-4 max-h-40 rounded-lg object-contain"
            />
          )}

          <div className="flex gap-2">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
              disabled={!form.name.trim() || !form.price.trim()}
            >
              Add Service
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-3 rounded-xl"
            >
              Clear
            </button>
          </div>
        </form>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {services.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No services listed yet.
            </div>
          )}
          {services.map((s) => (
            <div
              key={s._id}
              className="relative backdrop-blur-sm bg-white/90 rounded-2xl p-3 border border-white/30 shadow"
            >
              <h3 className="text-lg font-semibold mb-1">
                {s.name} <span className="text-blue-600">₹{s.price}</span>
              </h3>
              {s.duration && (
                <p className="text-sm text-gray-500 mb-1">Duration: {s.duration} min</p>
              )}
              {s.description && (
                <p className="text-gray-700 mt-1 mb-2 line-clamp-3 overflow-hidden text-ellipsis">
                  {s.description}
                </p>
              )}
              {s.imageUrl && (
                <img
                  src={`http://localhost:5000/${s.imageUrl.replace(/\\/g, "/")}`}
                  alt={s.name + " clinic"}
                  className="rounded-lg object-contain"
                  style={{ maxHeight: "100px", width: "140px", marginTop: "4px" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VetListServices;
