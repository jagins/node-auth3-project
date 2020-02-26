const jwt = require('jsonwebtoken');

function privateRoute(req, res, next)
{
    const {authorization} = req.headers;

    if(authorization)
    {
        jwt.verify(authorization, process.env.JWT_SECRET, (err, dedcodedToken) =>
        {
            if(err)
            {
                res.status(401).json({error: 'Invalid token'});
            }
            else
            {
                req.dedcodedToken = dedcodedToken;
                next();
            }
        })
    }
    else
    {
        res.status(400).json({error: 'Please provide a valid token'});
    }
}