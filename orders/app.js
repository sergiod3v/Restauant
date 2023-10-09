require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const baseURL = process.env.BASE_URL || "/api/v1";
app.get(baseURL, (req, res) => {
  res.json({ msg: "Orders Microservice Connected" })
})

app.listen(port, () =>
  console.log(`Server running on :${port}${baseURL}`)
);