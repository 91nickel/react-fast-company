const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const initDatabase = require('./startUp/initDatabase')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const PORT = config.get('port') ?? 8080

// if (process.env.NODE_ENV === 'production') {
//     console.log('Prod ...')
// } else {
//     console.log('Dev ...')
// }

async function start () {
    try {
        mongoose.connection.once('open', () => {
            initDatabase()
        })
        await mongoose.connect(config.get('mongDbConnectionString'))
        console.log(chalk.green(`MongoDB connected...`))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on port ${PORT}...`))
        })
    } catch(error) {
        console.error(chalk.red(error.message))
        process.exit(1)
    }
}
start()
