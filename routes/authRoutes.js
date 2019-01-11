/**********
This file contains the authentication routes 
***********/

const passport = require('passport');


// Route handler to launch authentication with passport using the strategy called google 
// GoogleStrategy contains its own identifier which is the string 'google'
// app.get(
//     '/auth/google',
//     passport.authenticate('google', 
//         {
//             scope: ['profile', 'email']
//         }
//     )
// );

// This is the callback function the google will send the code to
// Using the information in the response from google, passport will be able to get the `code` that we need to get profile information
// It looks the same as above, but the response uri contains the code and passport knows how to handle it
// app.get(
//     '/auth/google/callback',
//     passport.authenticate('google')
// );

/****************
 * AFTER REFACTOR
 ****************/

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google')
    );

    app.get(
        '/api/logout',
        (req, res) => {
            req.logout();
            // should be nothing, indicating logout was successful
            res.send(req.user);
        }
    );

    app.get(
        '/api/current_user', 
        (req, res) => {
            res.send(req.user);
        }
    );

}