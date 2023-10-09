require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const baseURL = process.env.BASE_URL || "/api/v1";

const userRouter = require('./routes/user-routes')
app.use(`${baseURL}/users`, userRouter)

app.get(`${baseURL}/`, (req, res) => {
  res.json({ msg: "Microservices Connected" })
})

app.listen(port, () =>
  console.log(`Server running on :${port}${baseURL}`)
);