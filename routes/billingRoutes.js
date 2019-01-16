const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    // Any time someone makes a post request to this route
    // use the reference to the function (requireLogin) to run when the request comes in
    // Express will call it internally, so don't need to invoke it as an argument
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // After receive the token in the req body, charge the card
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        // req.user is always accessible because of passport 
        // Set up automatically by passport because it is middleware
        req.user.credits += 5;

        const user = await req.user.save(); 

        // respond to the request with the updated user 
        // send the most up to date user info back to the browser 
        // This is the back end server but the client server still needs the new info
        res.send(user);
        
    });
};