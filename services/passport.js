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
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            // Check to see if new user, an asyc action
            // Anytime connecting with db, it is async
            // The query returns a promise
            User.findOne({
                    googleId: profile.id
                })
                .then(existingUser => {
                    if (existingUser) {
                        // There is already record for this user
                        // Use passport's done function to indicate the process is over
                        done(null, existingUser);
                    } else {
                        // There is no record for this user, create a new user
                        // use '.save()' function to add to database
                        // Asyc; call done once saved
                        new User({
                                googleId: profile.id
                            })
                            .save()
                            .then(user => done(null, user));
                    }
                })


        }
    )
);