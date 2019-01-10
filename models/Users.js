const mongoose = require('mongoose');
/**
 * ES2015 Destructuring
 *
 * const Schema = mongoose.Schema
 * 
 * The mongoose object has a property called 'schema' and we want 
 * to assign this property to a variable called 'schema'. 
 * So we can shorten the above notation to:
 */

const { Schema } = mongoose;

// Properties can be freely added and removed
const userSchema = new Schema({
    googleId: String
});

// Creates a new model class, a mongoDB collection called 'users' with the userSchema schema
mongoose.model('users', userSchema);