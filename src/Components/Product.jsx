import { useState, useEffect, useRef, useCallback } from "react";
import React, { Suspense, lazy } from "react";

const LazyCard = lazy(() => import("./Card"));
const LazyProductTable = lazy(() => import("./ProductTable"));

function Product({ products, setCartItems, setProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "ID", direction: "asc" });
  const [visibleData, setVisibleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const debounceTimeout = useRef(null);
  const itemsPerPage = 10;

  // 🔹 Pagination helper
  const paginateData = (data, page, limit) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return data.slice(start, end);
  };

  // 🔹 Filter, sort, and paginate
  const getVisibleData = () => {
    let filtered = products;

    // 🔍 search filter
    if (search) {
      const lowerSearch = search.toLowerCase();
      filtered = filtered.filter((p) =>
        p.Name.toLowerCase().includes(lowerSearch)
      );
    }

    // 🔽 category filter
    if (categoryFilter)
      filtered = filtered.filter((p) => p.Category === categoryFilter);

    // 🔽 status filter
    if (statusFilter)
      filtered = filtered.filter((p) => p.Status === statusFilter);

    // ↕️ sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    // 🔹 paginate
    return paginateData(filtered, currentPage, itemsPerPage);
  };

  useEffect(() => {
    setLoading(true);

    // Clear previous debounce
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      const data = getVisibleData();
      setVisibleData(data);
      setLoading(false);
    }, 300);

    return () => clearTimeout(debounceTimeout.current);
  }, [
    products,
    currentPage,
    search,
    categoryFilter,
    statusFilter,
    sortConfig,
    itemsPerPage,
  ]);

  const handleSort = useCallback(
    (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    },
    [sortConfig] // depends on sortConfig because you read from it
  );

  const totalPages = Math.ceil(
    products.filter((p) => {
      const matchesSearch = p.Name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter
        ? p.Category === categoryFilter
        : true;
      const matchesStatus = statusFilter ? p.Status === statusFilter : true;
      return matchesSearch && matchesCategory && matchesStatus;
    }).length / itemsPerPage
  );

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="md:flex justify-between">
        <div className="flex gap-4 mb-4">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {[...new Set(products.map((p) => p.Category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border rounded"
          >
            <option value="">All Status</option>
            {[...new Set(products.map((p) => p.Status))].map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative mb-4 max-w-sm w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyProductTable
          visibleData={visibleData}
          loading={loading}
          handleSort={handleSort}
          sortConfig={sortConfig}
          setProducts={setProducts}
          setCartItems={setCartItems}
        />
      </Suspense>

      {/* Card */}
      <Suspense fallback={<div>Loading Cart...</div>}>
        <LazyCard
          visibleData={visibleData}
          loading={loading}
          setCartItems={setCartItems}
          setProducts={setProducts}
        />
      </Suspense>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1 || loading}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages || loading}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default React.memo(Product);
