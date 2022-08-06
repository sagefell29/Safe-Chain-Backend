const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const storeFiles = require('./web3.storage/upload.js')
app.use(cors())
app.use(express.json())

app.get('/', async(req, res) => {
    // const cid = await storeFiles('{"name":"prasoon"}')
    res.send('<center><h1>Welcome to Cognition Project Backend</h1>')
})
app.use('/user', require('./routes/userRoutes'))

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})