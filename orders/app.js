require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const baseURL = process.env.BASE_URL || "/api/v1";

const orderRouter = require('./routes/order-routes')
app.use(`${baseURL}/orders`, orderRouter)

app.listen(port, () =>
  console.log(`Server running on :${port}${baseURL}`)
);