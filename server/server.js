const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();

require('dotenv').config({ path: '.env.development' });
const STRIPE_SECRET_KEY = JSON.stringify(process.env.STRIPE_SECRET_KEY);

const stripe = require("stripe")(STRIPE_SECRET_KEY);
const uuid = require("uuid");
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3001;


app.use(express.static(publicPath));
app.use(express.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up!');
});

app.post("/tip", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

app.listen(8080);
