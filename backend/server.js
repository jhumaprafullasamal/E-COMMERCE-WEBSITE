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

// connect DB & cloudinary
connectDB()
connectCloudinary()

// ✅ CORS CONFIG (TOP PE HI RAKHO)
const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-website-zhps.vercel.app"
]

// middlewares
app.use(express.json())

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
})

// export for vercel
export default app