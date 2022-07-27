import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "John Doe",
      email: "admin@email.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "Jane Doe",
      email: "jane@email.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Product 1",
      slug: "product-1",
      category: "Category 1",
      subcategory: "Subcategory 1",
      image: "/image/image1.jpeg",
      price: 10,
      brand: "Brand 1",
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
      description: "Nice cock",
    },
    {
      name: "Product 2",
      slug: "product-2",
      category: "Category 1",
      subcategory: "Subcategory 1",

      image: "/image/image1.jpeg",
      price: 10,
      brand: "Brand 2",
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
      description: "Nice cock2",
    },
    {
      name: "2Product 3",
      slug: "product-3",
      category: "Category 2",
      subcategory: "Subcategory 1",

      image: "/image/image1.jpeg",
      price: 10,
      brand: "Brand 3",
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
      description: "Nice cock3",
    },
    {
      name: "Product 4",
      slug: "product-4",
      category: "Category 2",
      subcategory: "Subcategory 1",

      image: "/image/image1.jpeg",
      price: 10,
      brand: "Brand 5",
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
      description: "Nice cock",
    },
    {
      name: "Product 3",
      slug: "product-5",
      category: "Category 3",
      subcategory: "Subcategory 1",

      image: "/image/image1.jpeg",
      price: 10,
      brand: "Brand 2",
      rating: 4.5,
      numReviews: 10,
      countInStock: 6,
      description: "Nice cock 43",
    },
  ],
};

export default data;
