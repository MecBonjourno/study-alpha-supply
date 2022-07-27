import { getSession } from "next-auth/react";

// const handler = nc();
const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send("signin required");
  }
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
};

// handler.get(async (req, res) => {
// });

export default handler;
