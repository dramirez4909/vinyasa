const router = require('express').Router();
const api = require('./api');
// const bodyParser = require('body-parser')

router.use('/api', api);
// router.use("body")

module.exports = router;
