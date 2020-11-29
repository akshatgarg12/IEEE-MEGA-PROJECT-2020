const express = require('express')
const apiRoutes = require('./api')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 5000;

app.use(express.json({limit:"20MB"}))
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api',apiRoutes);

app.listen(PORT,()=>console.log('server running'))