const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numRatings: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
  },
  { timestamps: true }
  // { collection: "product-data" }
);

module.exports =
  mongoose.models.ProductData || mongoose.model("ProductData", productSchema);

// export default Product;
