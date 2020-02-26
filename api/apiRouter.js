const express = require('express');
const userRouter = require('../users/userRouter');

const router = express.Router();

router.use('/users', userRouter);

router.post('/register', (req, res) =>
{
   
})

router.post('/login', (req, res) =>
{

})

module.exports = router;