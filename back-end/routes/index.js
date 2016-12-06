var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (request, response, next) => {
  response.status(200).json({ status: 'Success',
                              message: 'SUCCESS!!!'})
});

module.exports = router;
