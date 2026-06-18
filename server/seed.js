import { connectDB } from "./db.js";
import Product from "./models/Product.js";

const products = [
  { title: "Syltherine", description: "Stylish cafe chair", price: 3600000, discount: "30%", image: "/couch.jpg", category: "chairs" },
  { title: "Leviosa", description: "Minimalist cafe chair", price: 1250000, discount: "", image: "/couch.jpg", category: "chairs" },
  { title: "Lolito", description: "Luxury big sofa", price: 14000000, discount: "50%", image: "/couch.jpg", category: "sofas" },
  { title: "Respira", description: "Outdoor bar table and stool", price: 500000, discount: "", image: "/couch.jpg", category: "outdoor" },
  { title: "Grifo", description: "Night lamp", price: 1500000, discount: "", image: "/couch.jpg", category: "lighting" },
  { title: "Muggo", description: "Small hanger", price: 150000, discount: "10%", image: "/couch.jpg", category: "accessories" },
  { title: "Pingky", description: "Soft bedroom set", price: 7000000, discount: "20%", image: "/couch.jpg", category: "bedroom" },
  { title: "Potty", description: "Minimalist flower pot", price: 500000, discount: "", image: "/couch.jpg", category: "accessories" },
];

async function seed() {
  await connectDB();

  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);
  } else {
    console.log(`Database already has ${count} products, skipping seed`);
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
