import express from 'express'
import { apiRouter } from './routes/apiRoutes.js'


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

app.use('/api', apiRouter)

app.listen(PORT, () => console.log(`server connected on port ${PORT}`))
