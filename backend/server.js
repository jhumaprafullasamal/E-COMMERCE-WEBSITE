// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/database.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js'
// import productRouter from './routes/productRoute.js'
// import cartRouter from './routes/cartRoute.js'
// import orderRouter from './routes/orderRoute.js'

// //App Config
// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()


// // middlewares
// app.use(express.json())
// app.use(cors())

// // api endpoints
// app.use('/api/user', userRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/order', orderRouter)

// app.get("/", (req, res) => {
//   res.send("Backend is running 🚀");
// });

// app.listen(port, () => console.log('Server started on PORT : ' + port))

import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/database.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()

// Connect DB & Cloudinary
connectDB()
connectCloudinary()

// CORS CONFIG
const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-frontend-seven-gamma.vercel.app"  // ✅ your actual frontend
]

// Middlewares
app.use(express.json())
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

// API Endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
})

// ✅ REQUIRED FOR RENDER — must listen on a port
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app