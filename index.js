const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

// Avaialable Routes

app.use('/api/movies',require('./routes/movies'))
app.use('/api/favorites',require('./routes/favorites'))

app.get('/',(req,res)=>{
    res.send("Hello World!")
})

app.listen(5001,()=>{
    console.log("Server is running")
})

