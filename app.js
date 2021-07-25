// requiring the needed modules
require('dotenv').config();
const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');
const express = require('express');
const https = require('https');
// requiring the needed modules end

// getting the environment variables
port = process.env.PORT || 5000;
// getting the environment variables end

// getting the express routers
const { mainRouter } = require('./routes/mainRoutes');
const { userRouter } = require('./routes/userRoutes');
// getting the express routers end

// creating the express app
const app = express();

// setting the view engine
app.set('view engine', 'ejs');

// setting the public folder
app.use(express.static('./public'));

// setting up middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// setting up middlewares end

// creating an express https server
const server = https.createServer({ key: key, cert: cert }, app);

// Everything relating to the main page components
app.use(mainRouter);

// Everything relating to the user compoents
app.use('/users', userRouter);

// handling 404 errors
app.all('*', (req, res) => {
  res
    .status(404)
    .send('<h1>That page does not exist</h1> <br /> <a href="/">Go home</a>');
});

// listening for server call on PORT
server.listen(port, () => {
  console.log('listening on port ' + port + '......');
});
