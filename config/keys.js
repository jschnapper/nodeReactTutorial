// Determines whether to use production or development credentials 

// Heroku automatically sets NODE_ENV to "production," so if no in production,
// it will go to else case - will occur on local machine 
if (process.env.NODE_ENV === 'production') {
    // use production keys
    module.exports = require('./prod');
} else {
    // use dev keys
    module.exports = require('./dev'); 
}