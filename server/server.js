const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


var app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log(`Server is up on port ${port}`)
});
//configure express status middleware to serve up the public folder
//call app.listen on port 3000; print callback function to print "server is up"
//head to localhost::3000; refresh and get message up and running
