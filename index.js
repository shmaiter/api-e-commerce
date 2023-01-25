const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dontenv = require("dotenv");
dontenv.config();
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const authRoute = require("./routes/auth");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
        console.log(err);
    });

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3001"],
    })
);
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
