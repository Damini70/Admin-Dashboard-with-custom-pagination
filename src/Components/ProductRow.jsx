import { useState, useRef, useEffect } from "react";

export default function ProductRow({
  product,
  heading,
  handleView,
  handleEdit,
  setCartModalOpen,
  setDeleteModalOpen,
}) {
  const [open, setOpen] = useState(false); // dropdown
  const dropdownRef = useRef(null);

  // 🔽 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <tr className="border-t hover:bg-gray-50">
        {heading.map((col, i) => {
          switch (col) {
            case "ID":
              return (
                <td key={i} className="p-3 pl-10">
                  {product.ID}
                </td>
              );
            case "Image":
              return (
                <td key={i} className="p-3 pl-5">
                  <img
                    src={product.Image}
                    alt={product.Name}
                    className="w-12 h-12 rounded object-cover"
                    loading="lazy"
                  />
                </td>
              );
            case "Name":
              return (
                <td key={i} className="p-3 font-medium pl-5">
                  {product.Name}
                </td>
              );
            case "Category":
              return (
                <td key={i} className="p-3 pl-5">
                  {product.Category}
                </td>
              );
            case "Price":
              return (
                <td key={i} className="p-3 pl-5">
                  ${product.Price.toFixed(2)}
                </td>
              );
            case "Stock":
              return (
                <td key={i} className="p-3 pl-6">
                  {product.Stock}
                </td>
              );
            case "Status":
              return (
                <td key={i} className="p-3 pl-5">
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
                </td>
              );
            case "Actions":
              return (
                <td key={i} className="p-3 pl-5 relative" ref={dropdownRef}>
                  <button
                    onClick={() => setOpen(!open)}
                    className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Actions ⌄
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                      {product.Actions.map((action, idx) => (
                        <button
                          key={idx}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => {
                            setOpen(false);
                            if (action === "View") handleView(product);
                            else if (action === "Edit") handleEdit(product);
                            else if (action === "Delete")
                              setDeleteModalOpen(product);
                            else setCartModalOpen(product);
                          }}
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              );
            default:
              return null;
          }
        })}
      </tr>
    </>
  );
}
