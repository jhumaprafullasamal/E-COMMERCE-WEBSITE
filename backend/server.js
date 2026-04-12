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

const app = express()

connectDB()
connectCloudinary()

// ✅ Dynamic CORS — allows all Vercel preview deployments
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://e-commerce-frontend-seven-gamma.vercel.app"
    ]

    // Allow Postman / curl (no origin header)
    if (!origin) return callback(null, true)

    // Allow any *.vercel.app subdomain of your project
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      return callback(null, true)
    }

    callback(new Error('Not allowed by CORS'))
  },
  credentials: true
}))

app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get("/", (req, res) => {
  res.send("Backend is running 🚀")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app