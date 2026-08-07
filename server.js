import express from 'express'
import { apiRouter } from './routes/apiRoutes.js'
import { authRouter } from './routes/authRoutes.js'
import { dashboardRouter } from './routes/dashboardRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

/*
Challenge:
1. If a client uses an unknown route, serve this JSON 

{ message: "Endpoint not found. Please check the API documentation." }

Remember to server an error code!

Test:
http://localhost:8000/wrong-api/useless/user
*/

const PORT = 8000

const app = express()
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRouter)
app.use("/auth", authRouter)
app.use("/dashboard", dashboardRouter)
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })
})
app.listen(PORT, () => console.log(`server connected on port ${PORT}`))


