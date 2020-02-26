const database = require('../data/dbConfig');

function addUser(user)
{
    return database('users').insert(user, 'id')
    .then(ids =>
    {
        const [id] = ids;
        return findUser(id)
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

}

module.exports = {
    addUser,
    findUser,
    findUserById,
    findAllUsers
}