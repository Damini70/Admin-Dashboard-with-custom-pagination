import React from "react";

export default function CartItems({ cartItems, setCartItems }) {
  // Increase quantity of a product
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.ID === id ? { ...item, Quantity: (item.Quantity || 1) + 1 } : item
      )
    );
  };

  // Decrease quantity of a product
  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.ID === id
            ? { ...item, Quantity: Math.max((item.Quantity || 1) - 1, 1) }
            : item
        )
        .filter((item) => item.Quantity !== 0)
    );
  };

  // Remove product from cart
  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.ID !== id));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.Price || 0) * (item.Quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="w-full">
      {/* Desktop / Tablet Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 p-4">
        <table className="w-full table-auto text-left">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.ID} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.Name}</td>
                <td className="px-4 py-2">${item.Price.toFixed(2)}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  {item.Quantity > 1 && (
                    <button
                      onClick={() => handleDecrease(item.ID)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                  )}
                  <span>{item.Quantity || 1}</span>
                  <button
                    onClick={() => handleIncrease(item.ID)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </td>
                <td className="px-4 py-2">
                  ${(item.Price * (item.Quantity || 1)).toFixed(2)}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleRemove(item.ID)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="px-4 py-2 font-semibold text-right">
                Total:
              </td>
              <td className="px-4 py-2 font-semibold">
                ${totalAmount.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-4 h-[400px] overflow-auto">
        {cartItems.map((item) => (
          <div
            key={item.ID}
            className="border rounded-lg p-4 shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-sm">{item.Name}</h2>
              <button
                onClick={() => handleRemove(item.ID)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                Remove
              </button>
            </div>
            <p className="text-gray-500 text-xs">Price: ${item.Price.toFixed(2)}</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDecrease(item.ID)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span>{item.Quantity || 1}</span>
              <button
                onClick={() => handleIncrease(item.ID)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <p className="text-gray-700 text-sm font-semibold">
              Total: ${(item.Price * (item.Quantity || 1)).toFixed(2)}
            </p>
          </div>
        ))}
        <div className="text-right font-semibold mt-2">
          Total: ${totalAmount.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
