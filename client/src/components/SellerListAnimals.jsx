import React, { useState, useEffect } from "react";

function SellerListAnimals() {
  const [animals, setAnimals] = useState([]);
  const [form, setForm] = useState({
    name: "",
    species: "",
    age: "",
    shortDescription: "",
    longDescription: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const revokeAllPreviews = (urls) => {
    urls.forEach((u) => {
      try {
        URL.revokeObjectURL(u);
      } catch (error) {
        console.error("Failed to revoke URL:", error);
      }
    });
  };

  const validateFileType = (file) => {
    const allowedExtensions = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];
    return allowedExtensions.includes(file.type);
  };

  const handleImageChange = (e) => {
    const filesList = e.target.files ? Array.from(e.target.files) : [];
    if (filesList.length === 0) return;

    // Validate file types
    for (let file of filesList) {
      if (!validateFileType(file)) {
        alert(`File type not supported: ${file.name}`);
        e.target.value = null; // Clear the input
        return;
      }
    }

    if (imagePreviewUrls.length > 0) revokeAllPreviews(imagePreviewUrls);
    const previews = filesList.map((f) => URL.createObjectURL(f));
    setImageFiles(filesList);
    setImagePreviewUrls(previews);
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const seller = JSON.parse(localStorage.getItem("seller"));
        if (!seller?._id) throw new Error("Seller not logged in");

        const res = await fetch(`/api/pets?seller=${seller._id}`);
        if (!res.ok) throw new Error("Failed to fetch pets");
        const data = await res.json();
        setAnimals(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPets();

    return () => {
      if (imagePreviewUrls.length > 0) revokeAllPreviews(imagePreviewUrls);
    };
  }, [imagePreviewUrls]);

  const addAnimal = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.species.trim()) return;

    try {
      const seller = JSON.parse(localStorage.getItem("seller"));
      if (!seller?._id) throw new Error("Seller not logged in");

      const formDataToSend = new FormData();

      formDataToSend.append("seller", seller._id);
      formDataToSend.append("petName", form.name);
      formDataToSend.append("animalType", form.species);
      formDataToSend.append("petAge", form.age);
      formDataToSend.append("shortDescription", form.shortDescription);
      formDataToSend.append("longDescription", form.longDescription);

      imageFiles.forEach((file) => {
        formDataToSend.append("images", file);
      });

      const response = await fetch("/api/pets", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errResp = await response.json();
        throw new Error(errResp.error || "Failed to add pet");
      }

      const data = await response.json();
      alert(data.message);

      setAnimals((prev) => [...prev, data.pet]);

      setForm({
        name: "",
        species: "",
        age: "",
        shortDescription: "",
        longDescription: "",
      });
      setImageFiles([]);
      if (imagePreviewUrls.length > 0) revokeAllPreviews(imagePreviewUrls);
      setImagePreviewUrls([]);
      document.getElementById("animalImage").value = "";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-3xl p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold">List Animals</h1>
        <p className="text-blue-100 mt-1">
          Add animals you want to offer for adoption.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form on the left */}
        <form
          onSubmit={addAnimal}
          className="lg:col-span-1 bg-white rounded-2xl p-6 shadow border border-gray-300"
        >
          <h2 className="text-xl font-semibold mb-4">New Animal</h2>

          <label className="block mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded mb-3 p-2"
          />

          <label className="block mb-1">Species</label>
          <input
            name="species"
            value={form.species}
            onChange={handleChange}
            className="w-full border rounded mb-3 p-2"
          />

          <label className="block mb-1">Age</label>
          <input
            name="age"
            value={form.age}
            onChange={handleChange}
            className="w-full border rounded mb-3 p-2"
          />

          <label className="block mb-1">Short Description</label>
          <textarea
            name="shortDescription"
            value={form.shortDescription}
            onChange={handleChange}
            rows="2"
            placeholder="A brief, catchy summary"
            className="w-full border rounded mb-3 p-2"
          />

          <label className="block mb-1">Long Description</label>
          <textarea
            name="longDescription"
            value={form.longDescription}
            onChange={handleChange}
            rows="4"
            placeholder="Full details about personality, habits, etc."
            className="w-full border rounded mb-3 p-2"
          />

          <label className="block mb-1">Images</label>
          <label
            htmlFor="animalImage"
            className="cursor-pointer inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Choose Files
          </label>
          <input
            id="animalImage"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />

          {imagePreviewUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {imagePreviewUrls.map((url, idx) => (
                <img
                  key={idx}
                  src={url}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-24 object-cover rounded"
                />
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition"
          >
            Add Animal
          </button>
        </form>

        {/* Animals list on the right */}
        <div className="lg:col-span-2 space-y-6 overflow-y-auto max-h-[80vh]">
          
          {animals.length === 0 ? (
            <div className="text-gray-500 text-center">
              No animals listed yet.
            </div>
          ) : (
            animals.map((a) => (
              <div
                key={a._id || a.id}
                className="bg-white rounded-2xl shadow border overflow-hidden flex w-full max-w-xl mx-auto"
              >
                {a.imageUrls && a.imageUrls.length > 0 && (
                  <img
                    src={`http://localhost:5000/uploads/${a.imageUrls[0]}`}
                    style={{
                      objectFit: "contain",
                      width: "160px",
                      height: "160px",
                    }}
                    alt={a.petName}
                    className="w-40 h-40 object-cover rounded-l-2xl"
                  />
                )}
                <div className="p-4 flex flex-col justify-center">
                  <h3 className="font-semibold text-xl">
                    {a.petName}{" "}
                    <span className="text-gray-400">({a.animalType})</span>
                  </h3>
                  {a.petAge && (
                    <p className="text-sm text-gray-500 mt-1">
                      Age: {a.petAge}
                    </p>
                  )}
                  {a.shortDescription && (
                    <p className="text-gray-700 mt-2 max-w-md">
                      {a.shortDescription}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerListAnimals;
