require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const baseURL = process.env.BASE_URL || "/api/v1";

const userRouter = require('./routes/user-routes');
const authRouter = require('./routes/auth-routes');
const connectDB = require('./db/connect');

//middleware vars
const notFoundMiddleware = require('../common/middleware/not-found');
const authenticateUser = require('./middleware/authentication');


//rotuers
app.use(express.json())

app.use(`${baseURL}/auth`, authRouter)
app.use(`${baseURL}/users`, authenticateUser, userRouter)

app.get(`${baseURL}`, (req, res) => {
  res.json({ msg: "Microservices Connected" })
})

app.use(notFoundMiddleware)

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