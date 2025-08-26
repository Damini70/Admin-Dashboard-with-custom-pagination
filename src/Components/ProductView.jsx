import { useState } from "react";

export default function ProductView({
  product,
  isEditing = false,
  onSave,
  setIsEditing,
  setModalOpen
}) {
  if (!product) return <div className="p-4">No product selected</div>;

  const [editing, setEditing] = useState(isEditing);
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) onSave(formData);
    setIsEditing(false);
    setModalOpen(false)
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-2xl shadow-lg bg-white max-h-[400px] overflow-y-auto">
      {/* Image */}
      <div className="flex justify-center mb-4">
        {editing ? (
          <input
            type="text"
            name="Image"
            value={formData.Image}
            onChange={handleChange}
            className="border p-1 rounded w-40"
            placeholder="Image URL"
          />
        ) : (
          <img
            src={product.Image}
            alt={product.Name}
            className="w-40 h-40 object-cover rounded-lg shadow"
          />
        )}
      </div>

      {/* Title & Brand */}
      <div className="text-center mb-4">
        {editing ? (
          <>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="border p-2 rounded w-full mb-2 text-center"
              placeholder="Product Name"
            />
            <input
              type="text"
              name="Brand"
              value={formData.Brand}
              onChange={handleChange}
              className="border p-2 rounded w-full text-center"
              placeholder="Brand"
            />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">{product.Name}</h2>
            <p className="text-gray-500 text-sm">Brand: {product.Brand}</p>
          </>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center mb-4">
        {editing ? (
          <input
            type="number"
            name="Rating"
            value={formData.Rating}
            onChange={handleChange}
            min="0"
            max="5"
            className="border p-1 rounded w-16 text-center"
          />
        ) : (
          <>
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={`text-lg ${
                  i < product.Rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="ml-2 text-gray-600 text-sm">
              ({product.Rating}/5)
            </span>
          </>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <p>
          <strong>ID:</strong> {product.ID}
        </p>

        {editing ? (
          <>
            <input
              type="text"
              name="Category"
              value={formData.Category}
              onChange={handleChange}
              className="border p-1 rounded w-full"
              placeholder="Category"
            />
            <input
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              className="border p-1 rounded w-full"
              placeholder="Price"
            />
            <input
              type="number"
              name="Stock"
              value={formData.Stock}
              onChange={handleChange}
              className="border p-1 rounded w-full"
              placeholder="Stock"
            />
            <input
              type="text"
              name="Status"
              value={formData.Status}
              onChange={handleChange}
              className="border p-1 rounded w-full"
              placeholder="Status"
            />
          </>
        ) : (
          <>
            <p>
              <strong>Category:</strong> {product.Category}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              <span className="text-green-600 font-semibold">
                ${product.Price.toFixed(2)}
              </span>
            </p>
            <p>
              <strong>Stock:</strong> {product.Stock}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 text-xs rounded ${
                  product.Status === "In Stock"
                    ? "bg-green-100 text-green-600"
                    : product.Status === "Low Stock"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.Status}
              </span>
            </p>
          </>
        )}
      </div>

      {/* Description */}
      <div className="mt-4">
        <h3 className="font-semibold mb-1">Description:</h3>
        {editing ? (
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Description"
          />
        ) : (
          <p className="text-gray-700 text-sm leading-relaxed">
            {product.Description || "No description available."}
          </p>
        )}
      </div>

      {/* Save / Cancel Buttons */}
      {editing && (
        <div className="flex justify-end gap-2 mt-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
