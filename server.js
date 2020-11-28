const express = require('express')
const app = express()
const cors = require('cors')
const {spawn} = require('child_process');
const PORT = process.env.PORT || 5000;


app.use(express.json({limit:"10MB"}))
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.post('/',(req,res)=>{
  var dataToSend="";
  const {url} = req.body
  const python = spawn('python3',['script.py', url.toString()])
  // console.log(python)
  python.stdout.on('data', function (data) {
    // console.log('Pipe data from python script ...',data.toString());
    dataToSend += (data.toString());
   
   });
   python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser 
    res.json(dataToSend);
    });
});


app.listen(PORT)