import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import cors from 'cors'

dotenv.config()

const app:Application = express()

app.use(cors())
app.use(express.json())

app.get('/',(req:Request,res:Response) => {
    res.status(200).json('Connected API')
})

const startServer = async () => {
    try {
        const port = process.env?.PORT ? Number(process.env.PORT) : 3000;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

startServer()