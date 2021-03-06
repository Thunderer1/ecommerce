const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const errorMidddleware = require('./middleware/error');
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")
const path = require("path")
// config
dotenv.config({path:"backend/config/config.env"})
// parsing object to json
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(fileUpload())
// import route from productroute
const product = require("./routes/productRoute");
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")

if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
// it will give route to product crud operations
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// app.use(express.static(path.join(__dirname,"../frontend/public")))
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/public/index.html"));
//   });
// middleware for error
app.use(errorMidddleware);


// export app routes to server
module.exports = app