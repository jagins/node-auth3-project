const express = require('express');
const helmet = require('helmet');
require('dotenv').config();

const server = express();

server.use(helmet())
server.use(express.json());

server.get('/', (req, res) =>
{
    res.json({message: 'its working'});
})

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));