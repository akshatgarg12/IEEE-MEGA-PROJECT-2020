const {spawn} = require('child_process');
const redisClient= require('../redis')

const runPythonScript = (input,req,res,script) => {
  var dataToSend="";
  const python = spawn('python3',[`python-scripts/${script}`, input.toString()])
  python.stdout.on('data', function (data) {
    dataToSend += data;
   });
   python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    if(code === 0){
      redisClient.setex(JSON.stringify(req.body), 3*3600, dataToSend);
      return res.status(200).send(dataToSend);
    }else{
      return res.status(500).json({error:"An unexpected error occured."})
    }
  });
}

module.exports = runPythonScript;