import React, { useCallback, useState } from "react";
import { Modal } from "./Modal";
import ProductView from "./ProductView";

const Card = ({ visibleData, loading, setOpen, setCartItems, setProducts }) => {
  const [modalOpen, setModalOpen] = useState(false); // modal (view/edit)
  const [deleteModalOpen, setDeleteModalOpen] = useState(null); // modal (delete)
  const [cartModalOpen, setCartModalOpen] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // product for modal
  const [isEditing, setIsEditing] = useState(false);

  // 🔹 Action Handlers
  const handleView = useCallback((product) => {
    setIsEditing(false);
    setSelectedProduct(product);
    setModalOpen(true);
  }, []);

  const handleEdit = useCallback((product) => {
    setIsEditing(true);
    setSelectedProduct(product);
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback((id) => {
    console.log(id);
    setProducts((prev) => prev.filter((p) => p.ID !== id));
    setDeleteModalOpen(null);
  }, []);

  const handleSave = useCallback((updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.ID === updatedProduct.ID ? updatedProduct : p))
    );
    setSelectedProduct(updatedProduct);
    setIsEditing(false);
  }, []);

  const handleAddCart = useCallback(() => {
    setCartItems((prev) => {
      const itemExists = prev.find((item) => item.ID === cartModalOpen.ID);

      if (itemExists) {
        return prev.map((item) =>
          item.ID === cartModalOpen.ID
            ? { ...item, Quantity: item.Quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...cartModalOpen, Quantity: 1 }];
      }
    });
    setCartModalOpen(null);
  }, [cartModalOpen]);
  return (
    <>
      {" "}
      <div className="grid gap-4 md:hidden">
        {loading ? (
          <div className="text-center p-4">Loading...</div>
        ) : (
          visibleData.map((product) => (
            <div
              key={product.ID}
              className="border rounded-lg p-4 shadow-sm flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={product.Image}
                  alt={product.Name}
                  className="w-16 h-16 object-cover rounded"
                  loading="lazy"
                />
                <div>
                  <h2 className="font-semibold">{product.Name}</h2>
                  <p className="text-sm text-gray-500">{product.Category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 text-sm mt-2">
                <p>
                  <span className="font-medium">ID:</span> {product.ID}
                </p>
                <p>
                  <span className="font-medium">Price:</span> ${product.Price}
                </p>
                <p>
                  <span className="font-medium">Stock:</span> {product.Stock}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {product.Status}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-2">
                {product.Actions.map((action, idx) => {
                  let baseColor = "bg-blue-600 text-white hover:bg-blue-500"; // default
                  let Icon = null;

                  switch (action) {
                    case "View":
                      baseColor = "bg-gray-200 text-gray-800 hover:bg-gray-300";
                      Icon = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      );
                      break;
                    case "Edit":
                      baseColor =
                        "bg-yellow-500 text-white hover:bg-yellow-400";
                      Icon = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                          />
                        </svg>
                      );
                      break;
                    case "Delete":
                      baseColor = "bg-red-600 text-white hover:bg-red-500";
                      Icon = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      );
                      break;
                    case "Add to Cart":
                      baseColor = "bg-green-600 text-white hover:bg-green-500";
                      Icon = (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M7 13h10m-6-6v6m0 0H7"
                          />
                        </svg>
                      );
                      break;
                    default:
                      break;
                  }

                  return (
                    <button
                      key={idx}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg shadow-sm transition-colors duration-200 ${baseColor}`}
                      onClick={() => {
                        setOpen && setOpen(false);
                        if (action === "View")
                          handleView && handleView(product);
                        else if (action === "Edit")
                          handleEdit && handleEdit(product);
                        else if (action === "Delete")
                          setDeleteModalOpen && setDeleteModalOpen(product);
                        else setCartModalOpen && setCartModalOpen(product);
                      }}
                    >
                      {Icon && Icon}
                      {action}
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedProduct?.Name}
        size="md"
      >
        {selectedProduct && (
          <ProductView
            product={selectedProduct}
            isEditing={isEditing}
            onSave={handleSave}
            handleView={handleView}
            handleEdit={handleEdit}
            setIsEditing={setIsEditing}
            setModalOpen={setModalOpen}
          />
        )}
      </Modal>
      {/* 🔹 Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(null)}
        title="Delete Confirmation"
        size="sm"
        onOk={() => handleDelete(deleteModalOpen.ID)}
        okText="Yes, Delete"
        cancelText="Cancel"
        footer="true"
      >
        <p className="text-center text-base">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{deleteModalOpen?.Name}</span>?
        </p>
      </Modal>
      {/* 🔹 Add to cart Confirmation Modal */}
      <Modal
        open={cartModalOpen}
        onClose={() => setCartModalOpen(null)}
        title="Add to cart Confirmation"
        size="sm"
        onOk={handleAddCart}
        okText="Yes"
        cancelText="Cancel"
        footer="true"
      >
        <p className="text-center text-base">
          Are you sure you want to add{" "}
          <span className="font-semibold">{cartModalOpen?.Name}</span> in the
          Cart?
        </p>
      </Modal>
    </>
  );
};

export default React.memo(Card);
