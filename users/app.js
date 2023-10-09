require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const baseURL = process.env.BASE_URL || "/api/v1";

const userRouter = require('./routes/user-routes');
const connectDB = require('./db/connect');
//middleware
app.use(express.json())

//rotuers
app.use(`${baseURL}/users`, userRouter)

app.get(`${baseURL}/`, (req, res) => {
  res.json({ msg: "Microservices Connected" })
})

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Users DB connected, microservice running on -> ${baseURL}/users`)
    );
  } catch (error) {
    console.log(error)
  }
}
start()