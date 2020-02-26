const express = require('express');
const userRouter = require('../users/userRouter');
const bcrypt = require('bcryptjs');
const {verifyRegistration} = require('../utils/verifyRegistration');
const Users = require('../users/users-model');

const router = express.Router();

router.use('/users', userRouter);

router.post('/register', verifyRegistration, (req, res) =>
{
   const user = req.body;
   const hashPassword = bcrypt.hashSync(user.password, 8)
   user.password = hashPassword;

   Users.addUser(user)
   .then(createdUser =>
    {
        res.status(201).json(createdUser);
    })
   .catch(error =>
    {
        res.status(500).json({error: 'Unable to save user to the database'});
    })
})

router.post('/login', (req, res) =>
{

})

module.exports = router;