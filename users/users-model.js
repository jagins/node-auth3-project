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
function findUser(id)
{
    return database('users').where({id}).first();
}

function findAllUsers()
{

}

module.exports = {
    addUser,
    findUser,
    findAllUsers
}