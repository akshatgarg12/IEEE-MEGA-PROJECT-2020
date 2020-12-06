const router = require('express').Router();
const runPythonScript = require('../util/runPythonScript')
const cache  = require('../middlewares/cache')


router.post('/product_review',cache,(req,res)=>{
  const {url} = req.body;
  runPythonScript(url,req,res,'scrape_product_review_3.py')
});

router.post('/search_amazon',cache,(req,res)=>{
  const {product} = req.body;
  runPythonScript(product,req,res,'search_amazon.py')
});


module.exports = router