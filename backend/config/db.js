const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://lovee3434:9478731680@cluster0.87najcv.mongodb.net/mernapp?retryWrites=true&w=majority')
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)

  } catch (error) {
    console.log(`error ${error}`)
    process.exit(1)
  }
}

module.exports = connectDB