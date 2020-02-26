const express = require('express');
const Users = require('../users/users-model')

const router = express.Router();

router.get('/', (req, res) =>
{
   Users.findAllUsers()
   .then(users =>
    {
        res.status(200).json(users);
    })
   .catch(error =>
    {
        res.status(500).json({error: 'Unable to get all users'});
    })
})

module.exports = router;