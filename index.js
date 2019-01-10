const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
// But we also need to require the use of the passport service,
// Otherwise, the file would never be referenced
// However, we don't need to assign a variable to it because 
// Nothing is exported from that file, we just want to make sure it's executed
// Order of ****require statements matters****. If the below requires were the other way around, Passport would attempt to load a model that isn't yet declared, throwing an error
require('./models/Users');
require('./services/passport');

mongoose.connect(keys.mongoURI);

// Creates express application
const app = express();



/* 
An express route handler that is watching for specific http requests with a specific method. Watch a for a request that is accessing a specific route: '/'
req: a js object representing the incoming request
res: data to be sent back to whoever made the request
*/

// No longer relevant since we are using passport

// app.get('/', (req, res) => {
//     res.send({hi: 'potato'});
// });

// Immediately invokes the function exported by the file with the app object
require('./routes/authRoutes')(app);
/**
 * Also can be written as
 * 
 * const authRoutes = require('./routes/authRoutes');
 * authRoutes(app);
 */




/* 
Dynamically assign the port to listen to.
Environment variable is injected by deployment service

Environment variables are variables that are set in the underlying runtime that Node is running on top of

This allows configuration at runtime – it isn't known beforehand and can't be looked up

If PORT isn't defined or injected, i.e. we are in development and not in production, then use port 5000
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT);