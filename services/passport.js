/*********
This file contains the service to register the use of passport
***********/

const passport = require('passport');
const mongoose = require('mongoose');
// The strategy of choice we are using for passport
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// Connects the model 'users' collection to user 
const User = mongoose.model('users');


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
        (accessToken, refreshToken, profile, done) => {
            // use '.save()' function to add to database
            new User({
                googleId: profile.id
            }).save();
        }
    )
);