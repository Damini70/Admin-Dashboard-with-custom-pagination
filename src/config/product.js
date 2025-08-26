const categories = ["Sports", "Electronics", "Clothing", "Toys", "Home"];
const brands = ["Sportify", "FitLife", "TechGear", "Clothify", "HomePro"];
const actions = ["Edit", "Delete", "View", "Add to Cart"];
const statusOptions = ["In Stock", "Low Stock", "Out of Stock"];

const generateMockProducts = (count) => {
  const products = new Array(count).fill(null).map((_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const stock = Math.floor(Math.random() * 100); // 0-99 stock
    const status =
      stock === 0
        ? "Out of Stock"
        : stock < 10
        ? "Low Stock"
        : "In Stock";

    return {
      ID: i + 1,
      Image: `https://picsum.photos/seed/${i + 1}/100/100`,
      Name: `Product ${i + 1}`,
      Category: category,
      Price: parseFloat((Math.random() * 500 + 50).toFixed(2)), // $50-$550
      Stock: stock,
      Status: status,
      Actions: [...actions],
      Description:
        "High-quality product designed for performance and durability, suitable for everyone.",
      Brand: brand,
      Rating: parseFloat((Math.random() * 5).toFixed(1)), // 0-5 rating
    };
  });

  return products;
};

// Example: generate 1000 products
export const products = generateMockProducts(1000);

