'use strict';
console.log('our first server');

//REQUIRE
//in our servers we have to use require instead of import
//here we will list the requirments for a server
const express = require('express');
const cors= require('cors');
//we need to bring in our env file
require('dotenv').config();


//once we have required something we have to use it
//here is where we will assign the rewuired file a variable
//react does this in one step with import = express takes 2 steps: require and use
const app = express();
app.use(cors());

//define the port and validate env file working 
const PORT = process.env.PORT || 3002;

//ROUTES
//this is where we will write handlers for our endpoints 
app.get('/', (request,response) =>{
    response.status(200).send('home');
});

//create a basic default route
//app,get() takes in a paramater or a url in quotes and callback function

//error
//handle any errors

//listen
//start the server

// listen is an express method
app.listen(PORT,() => console.log(`listening on port ${PORT}`));