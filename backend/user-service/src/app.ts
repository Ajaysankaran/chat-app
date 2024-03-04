import express from 'express';
import { Express } from 'express';
import { logger } from './config/logger'
import { PORT } from './config/config'
import userRouter from './routes/user.route';
import pgClient from './config/db_config';
var cors = require('cors')

const app: Express = express();
pgClient.connect().then(() => {
    logger.info("Postgres connected ")
})

app.use(cors())
app.use(express.json())
app.use(userRouter)

app.get("/", (req, res) => {
    res.status(200).send("HTTP working successfully")
})

app.listen(PORT, () => {
    logger.info(`Server Started Successfully.. PORT: ${PORT}`)
})
