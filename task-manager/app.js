const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

const { MONGO_URI, PORT } = process.env


// middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(MONGO_URI)
    app.listen(PORT, console.log(`server is listening on port ${PORT}...`))
  } catch (error) {
    console.log(error);
  }
}

start()