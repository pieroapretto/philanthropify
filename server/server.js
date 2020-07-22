const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const got = require('got');
const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.development' });
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { uuid } = require('uuidv4');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3001;

app.use(express.static(publicPath));
app.use(cors());

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up on port: ' + port);
});

app.post("/balance", async (req, res) => {
  try {
    var balance = await stripe.balance.retrieve({});
    
  } catch (error) {
    res.status(400);
    res.send({ error: error });
    return;
  }
  res.status(200);
  res.send(balance);
});

app.get("/connect/oauth", async (req, res) => {
  const { code, state } = req.query;

  // Assert the state matches the state you provided in the OAuth link (optional).
  if(!stateMatches(state)) {
    return res.status(403).json({ error: 'Incorrect state parameter: ' + state });
  }

  // Send the authorization code to Stripe's API.
  stripe.oauth.token({
    grant_type: 'authorization_code',
    code
  }).then(
    (response) => {
      var connected_account_id = response.stripe_user_id;
      saveAccountId(connected_account_id);

      // Render some HTML or redirect to a different page.
      return res.status(200).json({success: true});
    },
    (err) => {
      if (err.type === 'StripeInvalidGrantError') {
        return res.status(400).json({error: 'Invalid authorization code: ' + code});
      } else {
        return res.status(500).json({error: 'An unknown error occurred.'});
      }
    }
  );
});

const stateMatches = (state_parameter) => {
  // Load the same state value that you randomly generated for your OAuth link.
  const saved_state = 'sv_53124';

  return saved_state == state_parameter;
}

const saveAccountId = (id) => {
  // Save the connected account ID from the response to your database.
  console.log('Connected account ID: ' + id);
}

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

app.post("/create-account-hosted", async (req, res) => {
  const data = req.body;
  try {
    // Create account
    var account = await stripe.accounts.create({
      type: 'custom',
      business_type: 'individual',
      requested_capabilities: ['card_payments', 'transfers'],
    });

    // Create accountLink
    var accountLink = await stripe.accountLinks.create({
      account: account.id,
      success_url: 'http://localhost:8080?success',
      failure_url: 'http://localhost:8080?failure',
      type: 'custom_account_verification',
      collect: 'eventually_due'
    });

  } catch (err) {
    console.log(err);
    res.status(400);
    res.send({ error: err });
    return;
  }
  res.send(accountLink);
});

app.get('/test', function (req, res) {
  res.send('hello world');
});

app.get("/get-oauth-link", async (req, res) => {
  const state = uuid();

  const args = new URLSearchParams({
    state,
    client_id: process.env.STRIPE_CLIENT_ID,
    scope: "read_write",
    response_type: "code"
  });

  const url = `https://connect.stripe.com/oauth/authorize?${args.toString()}`;

  return res.send({ url });
});

app.post("/get-metadata", async (req, res) => {
  const { targetUrl } = req.body;
  const { body: html, url } = await got(targetUrl);
  const metadata = await metascraper({ html, url })
  return res.send(metadata);
});
