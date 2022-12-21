const router = require("express").Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

// this represents the data stored in MongoDB
const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

router.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map((item) => {
                const storeItem = storeItems.get(item.id);
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: storeItem.name,
                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/`,
        });

        res.send({ url: session.url });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

    // stripe.charges.create(
    //   {
    //     source: req.body.tokenId,
    //     amount: req.body.amount,
    //     currency: "usd",
    //   },
    //   (stripeErr, stripeRes) => {
    //     if (stripeErr) {
    //       res.status(500).json(stripeErr);
    //     } else {
    //       res.status(200).json(stripeRes);
    //     }
    //   }
    // );
});

module.exports = router;
