import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/index.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
const db = process.env.MONGODB_URL

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection

connection.on("error", console.error.bind(console, "deu ruim na conexão do mongo: "))
connection.once("open", () =>{
    console.log('Mongo conectado');
})

app.use(express.json())
app.use('/api/', routes)
app.listen(3000, () => {
    console.log('Server rodando na porta 3000');
})