const database = require('../data/dbConfig');

function addUser(user)
{
    return database('users').insert(user, 'id')
    .then(ids =>
    {
        const [id] = ids;
        return findUserById(id)
    })
}
function findUser(user)
{
    return database('users').where(user).first();
}

function findUserById(id)
{
    return database('users').where({id}).first();
}
function findAllUsers()
{
    return database('users');
}

module.exports = {
    addUser,
    findUser,
    findUserById,
    findAllUsers
}