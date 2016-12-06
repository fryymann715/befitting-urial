var express = require('express');
var router = express.Router();
var Task = require('../database/Task');

/* GET home page. */
router.get('/', (request, response, next) => {
  response.status(200).json({ status: 'Success',
                              message: 'SUCCESS!!!'})
});

router.post('/task', Task.add )
router.get('/task', Task.getAll )
router.get('/task/:id', Task.getById )
router.put('/task', Task.update )
router.delete('/task/:id', Task.delete )



module.exports = router;
