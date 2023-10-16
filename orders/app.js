require('dotenv').config();
require('express-async-errors');
const express = require('express');

const Helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const http = require('http')
const socketIO = require('socket.io')

const app = express();
const port = process.env.PORT || 3002;
const baseURL = process.env.BASE_URL || "/api/v1";

const server = http.createServer(app)

const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins, replace with your specific domains
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  req.io = io;
  next();
});
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const connectDB = require('./db/connect');

const orderRouter = require('./routes/order-routes');
const ingredientRouter = require('./routes/ingredient-routes');
const recipeRouter = require('./routes/recipe-routes');
//middleware
const notFoundMiddleware = require('../common/middleware/not-found');
const authenticateUserMiddleware = require('./middleware/authentication');

app.use(Helmet())
app.use(express.json())



app.use(cors({
  origin: "*",
}))


// Limit the number of requests per IP address
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per minute
});
app.use(limiter);
//rotuers
app.use(`${baseURL}/orders`, authenticateUserMiddleware, orderRouter)
app.use(`${baseURL}/ingredients`, authenticateUserMiddleware, ingredientRouter)
app.use(`${baseURL}/recipes`, authenticateUserMiddleware, recipeRouter)

app.use(notFoundMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    server.listen(port, () =>
      console.log(`Orders DB connected, microservice running on -> ${baseURL}/orders`)
    );
  } catch (error) {
    console.log(error)
  }
}
start()