const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<center><h1>Welcome to Cognition Project Backend</h1>')
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})