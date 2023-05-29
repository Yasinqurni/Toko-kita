const dotenv = require('dotenv')

const cronJob  = require('./app/middlewares/cron-job')

dotenv.config({path: `.env.${process.env.NODE_ENV}`})

const app = require('./app')

cronJob.start()

const port = process.env.PORT

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
        