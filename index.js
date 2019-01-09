const express = require('express');
const passport = require('passport');
// The strategy of choice we are using for passport
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

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

// Declares a new instance of the google passport stragegy 
// Enables the application to authenticate with google
// Within GoogleStrategy we provide a configuration to inform how to autheticate within the application
// passport.use is a generic register to indicate a specific strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'            
        }, 
        accessToken => {
            console.log(accessToken);
        }
    )
);

// Route handler to launch authentication with passport using the strategy called google 
// GoogleStrategy contains its own identifier which is the string 'google'
app.get(
    '/auth/google',
    passport.authenticate('google', 
        {
            scope: ['profile', 'email']
        }
    )
);

// This is the callback function the google will send the code to
// Using the information in the response from google, passport will be able to get the `code` that we need to get profile information
// It looks the same as above, but the response uri contains the code and passport knows how to handle it
app.get(
    '/auth/google/callback',
    passport.authenticate('google')
);

/* 
Dynamically assign the port to listen to.
Environment variable is injected by deployment service

Environment variables are variables that are set in the underlying runtime that Node is running on top of

This allows configuration at runtime – it isn't known beforehand and can't be looked up

If PORT isn't defined or injected, i.e. we are in development and not in production, then use port 5000
*/
const PORT = process.env.PORT || 5000;

app.listen(PORT);