import React, { useState, useCallback } from "react";
import ProductRow from "./ProductRow";
import Modal from "./Modal";
import ProductView from "./ProductView";
const LazyProductView = import("./ProductView");
const LazyModal = import("./Modal");

const initialHeadings = [
  "ID",
  "Image",
  "Name",
  "Category",
  "Price",
  "Stock",
  "Status",
  "Actions",
];

const ProductTable = ({
  loading,
  visibleData,
  handleSort,
  sortConfig,
  setProducts,
  setCartItems,
}) => {
  const [heading, setHeading] = useState(initialHeadings);
  const [draggedCol, setDraggedCol] = useState(null);
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

  const handleDragStart = (index) => {
    setDraggedCol(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // allow drop
  };

  const handleDrop = (index) => {
    if (draggedCol === null) return;

    const updated = [...heading];
    const [moved] = updated.splice(draggedCol, 1);
    updated.splice(index, 0, moved);

    setHeading(updated);
    setDraggedCol(null);
  };

  return (
    <div className="hidden overflow-x-auto shadow rounded-2xl md:block">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            {heading.map((col, index) => (
              <th
                key={col}
                className={`p-3 pl-10 cursor-pointer transition-all duration-300 ease-in-out ${
                  draggedCol === index ? "bg-gray-300" : ""
                }`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                onClick={() => handleSort(col)}
              >
                <div className="flex items-center gap-1">
                  {col}
                  {sortConfig?.key === col &&
                    (sortConfig.direction === "asc" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    ))}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : (
            visibleData.map((product) => (
              <ProductRow
                key={product.ID}
                product={product}
                heading={heading}
                setProducts={setProducts}
                setCartItems={setCartItems}
                setDeleteModalOpen={setDeleteModalOpen}
                setCartModalOpen={setCartModalOpen}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleView={handleView}
              />
            ))
          )}
        </tbody>
      </table>

      {/* 🔹 Modal for viewing / editing details */}
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
    </div>
  );
};

export default React.memo(ProductTable);
