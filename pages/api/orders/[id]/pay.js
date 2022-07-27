import Order from "../../../../models/Order";
import db from "../../../../utils/db";
import { getSession } from "next-auth/react";

// handler.put(async (req, res) => {
//   const session = await getSession({ req });

//   await db.connect();
//   const order = await Order.findById(req.query.id);

//   if (order) {
//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       email_address: req.body.payer.email_address,
//     };
//     const paidOrder = await order.save();
//     await db.disconnect();
//     res.send({ message: "order paid", order: paidOrder });
//   } else {
//     await db.disconnect();
//     res.status(404).send({ message: "order not found" });
//   }
// });

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("signin required");
  }

  await db.connect();
  const order = await Order.findById(req.query.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.payer.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: "order paid", order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "order not found" });
  }
};

export default handler;
