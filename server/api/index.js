const router = require('express').Router();
const runPythonScript = require('../util/runPythonScript')


router.post('/product_review', (req,res)=>{
  const {url} = req.body;
  runPythonScript(url,res,'scrape_product_review_3.py')
});

router.post('/search_amazon', (req,res)=>{
  const {product} = req.body;
  runPythonScript(product,res,'search_amazon.py')
});


module.exports = router