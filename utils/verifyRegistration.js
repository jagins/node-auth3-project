function verifyRegistration(req, res, next)
{
    const user = req.body
    
    if(user.username && user.password && user.department)
    {
        next();
    }
    else
    {
        res.status(400).json({error: 'Please provide a username, password, and department'});
    }
}

module.exports = verifyRegistration;