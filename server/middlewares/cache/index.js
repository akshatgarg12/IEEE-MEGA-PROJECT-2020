const redisClient = require('../../util/redis')

const cache = (req,res,next) => {
  // get the endpoint of request
  const query = req.body;
  redisClient.get(JSON.stringify(query),(err, reply)=>{
    if(err){
      console.error(err);
      next();
    }
    // check if data exists if not then next
    if(reply){
      res.status(200).send(JSON.parse(reply));
    }else{
      next();
    }
  })
}

module.exports = cache;