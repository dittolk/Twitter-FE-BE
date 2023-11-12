const express = require('express')
const PORT = 2000
const db = require('./models')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api', (req, res) => {
    res.send.apply("This is my API");
})

const {userRouter, tweetRouter} = require('./routers')
app.use('/user', userRouter)
app.use('/tweet', tweetRouter)

app.listen(PORT, () => {
    //sync on off
    // db.sequelize.sync({alter: true})
    console.log(`Server running on Port : ${PORT}`);
})