const express = require('express')
const connectToMongo = require('./config/db')
const cors = require("cors");
// CALL ENV FILE
require("dotenv").config();

connectToMongo()

const app = express()
app.use(express.static('public'));
app.use(express.json())
app.use(cors());

const PORT = 5000

// Available Routes
app.use('/api/v1/auth', require('./routes/admin/auth'))
app.use('/api/v1/admin/trading', require('./routes/admin/trading'))


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})