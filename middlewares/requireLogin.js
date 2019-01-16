// Our own middleware to 
// check to see if user is logged in

/**
 * Middleware is a function that takes the incoming request
 * and has the ability to modify it   
 * 
 * @param next is called when the middleware is complete
 */

module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' }); // unauthorized or forbidden response 
    }

    next();
    
} 