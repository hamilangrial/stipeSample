const express = require("express");

const app = express();

const stripe = require("stripe")(
  "sk_test_51OB2QjK34i9ph9LTPZRTH6V8U7eNWGq15y9Xvgkd4dt6pL8QIk66M4HENA0mX3YLUqcUKsCK3IPvHCtJNQ2HMNUP00GEWcvWUO"
);

// app.use((request, response) => {
//     console.log("in call")
//     response.json({ message: 'Hey! This is your server fucking response!' });
//  });

app.post("/create-session", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        price: "price_1OB2haK34i9ph9LTbvMObDAJ",
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.send({ clientSecret: session.client_secret });
});

app.get("/get-session", async (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
    data: session,
  });
});

module.exports = app;
