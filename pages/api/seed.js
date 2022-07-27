import nc from "next-connect";
import Product from "../../models/Product";
import db from "../../utils/db";
import data from "../../utils/data";
import User from "../../models/User";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Product.deleteMany({});
  await Product.insertMany(data.products);
  await User.deleteMany({});
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ messge: "seeded successfully" });
});

export default handler;