const express = require('express');
const userRouter = require('../users/userRouter');
const bcrypt = require('bcryptjs');
const verifyRegistration = require('../utils/verifyRegistration');
const Users = require('../users/users-model');
const jwt = require('jsonwebtoken');
const privateRoute = require('../utils/privateRoute');

const router = express.Router();

router.use('/users', privateRoute, userRouter);

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
    const {username, password} = req.body;

    Users.findUser({username}).first()
    .then(user =>
    {
        if(user && bcrypt.compareSync(password, user.password))
        {
            const token = createToken(user);

            res.status(200).json({subject: user.id, token});
        }
        else
        {
            res.status(401).json({error: "Invalid username or password"});
        }
    })
    .catch(error =>
    {
        res.status(500).json({error: 'There was an error logging in'});
    })
})

function createToken(user)
{
    const payload = {
        username: user.username
    };

    const options = {
        expiresIn: '1hr'
    };

    return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;