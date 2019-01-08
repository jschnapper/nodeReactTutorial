const express = require('express');

// Creates express application
const app = express();

/* 
An express route handler that is watching for specific http requests with a specific method. Watch a for a request that is accessing a specific route: '/'
req: a js object representing the incoming request
res: data to be sent back to whoever made the request
*/
app.get('/', (req, res) => {
    res.send({hi: 'there'});
});


/* 
Dynamically assign the port to listen to.
Environment variable is injected by deployment service

Environment variables are variables that are set in the underlying runtime that Node is running on top of

This allows configuration at runtime – it isn't known beforehand and can't be looked up

If PORT isn't defined or injected, i.e. we are in development and not in production, then use port 5000
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT);