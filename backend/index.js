const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require("path");

require('dotenv').config()

const PORT = 5000;

const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Routes
const bookRoutes = require('./src/model/book/book.routes')
const userRoutes = require('./src/model/user/user.routes')
const orderRoutes = require('./src/model/order/order.routes')
const dashboardStatsRoutes = require('./src/model/status/stats.routes')

app.use('/api/book', bookRoutes)
app.use('/api/auth', userRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/stats', dashboardStatsRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URL)
}

main().then(() => console.log("Mongodb connect successfully!")).catch(err => console.log(err))

app.listen(PORT, () => {
    console.log("Book store run on port", PORT)
})
