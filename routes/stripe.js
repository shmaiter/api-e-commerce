const router = require("express").Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

// this represents the data stored in MongoDB
// const storeItems = new Map([
//     [1, { priceInCents: 10000, name: "Learn React Today" }],
//     [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ]);

router.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount } = req.body.items;
        console.log(amount);

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "usd",
            payment_method_types: ["card"],
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
