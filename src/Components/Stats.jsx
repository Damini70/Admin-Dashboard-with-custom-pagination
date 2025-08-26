import React from "react";

const Stats = ({ products }) => {
  // Compute stats dynamically based on current products array
  const statsData = React.useMemo(() => [
    { id: 1, title: "Total Products", value: products.length },
    {
      id: 2,
      title: "Total Revenue",
      value: products.reduce(
        (acc, item) => acc + (item.Price || 0) * (item.Sold || 0),
        0
      ),
    },
    {
      id: 3,
      title: "Low Stock Items",
      value: products.filter((item) => item.Status === "Low Stock").length,
    },
    {
      id: 4,
      title: "Categories Count",
      value: new Set(products.map((item) => item.Category)).size,
    },
  ], [products]); // recompute only when products changes

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {statsData.map((stat) => (
        <div
          key={stat.id}
          className="bg-white p-6 shadow rounded-2xl flex flex-col items-center justify-center"
        >
          <h3 className="text-base font-medium text-gray-600">{stat.title}</h3>
          <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
