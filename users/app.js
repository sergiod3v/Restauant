require('dotenv').config();
require('express-async-errors');
const express = require('express');
const Helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

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
app.use(Helmet())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins, replace with your specific domains
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(cors({
  origin: "*",
}))

// Limit the number of requests per IP address
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per minute
});
app.use(limiter);

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
