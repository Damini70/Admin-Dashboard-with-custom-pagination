import { products } from "./product";
export const statsData = [
  {
    id: 1,
    title: "Total Products",
    value: products.length, // products.length
  },
  {
    id: 2,
    title: "Total Revenue",
    value: "$45,000", // sum of price * sold
  },
  {
    id: 3,
    title: "Low Stock Items",
    value: products.filter((item)=> item.Status ==="Low Stock").length, // products where stock < threshold
  },
  {
    id: 4,
    title: "Categories Count",
    value: new Set(products.map(item => item.Category)).size, // unique categories
  },
];
console.log(statsData)
