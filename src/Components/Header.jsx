import React, { useState } from "react";
import CartItems from "./CartItems";
import { Modal } from "./Modal";

const Header = ({
  cartItems,
  onCartClick,
  search,
  setSearch,
  openCart,
  setOpenCart,
  setCartItems,
}) => {
 
  const getTotalCartItems = () =>
    cartItems.reduce((acc, item) => acc + (item?.Quantity ?? 0), 0);

  return (
    <>
      <Modal
        open={openCart} // open when cartModalOpen has a value
        onClose={() => setOpenCart(false)}
        title="Your Cart"
        size="lg"
        okText="Checkout"
        cancelText="Close"
        onOk={() => {
          console.log("Proceed to checkout with items:");
          setOpenCart(false);
        }}
      >
        {openCart && (
          <CartItems
            cartItems={cartItems} // pass cart items array
            setCartItems={setCartItems} // allow updating quantities/removing items
          />
        )}
      </Modal>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43A2 2 0 008.07 11h4.86a2 2 0 001.985-1.782l1.358-5.43a.995.995 0 00.01-.042L17.78 3H19a1 1 0 000-2H3zm1.5 4.25a.75.75 0 011.5 0v.5a.75.75 0 01-1.5 0v-.5zM6.75 5a.75.75 0 00-.75.75v.5a.75.75 0 001.5 0v-.5A.75.75 0 006.75 5zm1.5-.75a.75.75 0 011.5 0v.5a.75.75 0 01-1.5 0v-.5zM9.25 5a.75.75 0 00-.75.75v.5a.75.75 0 001.5 0v-.5A.75.75 0 009.25 5zm1.5-.75a.75.75 0 011.5 0v.5a.75.75 0 01-1.5 0v-.5z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900">ShopSmart</h1>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                      onChange={(e) => {
              setSearch(e.target.value);
        
            }}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>

              {/* Cart Button */}
              <div className="relative">
                <button
                  onClick={onCartClick}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 relative"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6h9m-9 0a2 2 0 104 0m-4 0a2 2 0 114 0m-4 0h4"
                    />
                  </svg>
                  {getTotalCartItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalCartItems()}
                    </span>
                  )}
                </button>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                value={search}
                     onChange={(e) => {
              setSearch(e.target.value);
            }}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
