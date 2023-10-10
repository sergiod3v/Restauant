require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const baseURL = process.env.BASE_URL || "/api/v1";

const connectDB = require('./db/connect');

const orderRouter = require('./routes/order-routes');
//middleware
const notFoundMiddleware = require('../common/middleware/not-found');
const authenticateUserMiddleware = require('./middleware/authentication');
app.use(express.json())
//rotuers
app.use(`${baseURL}/orders`, authenticateUserMiddleware, orderRouter)
app.use(notFoundMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Orders DB connected, microservice running on -> ${baseURL}/orders`)
    );
  } catch (error) {
    console.log(error)
  }
}
start()