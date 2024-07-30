const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

require('dotenv').config(); 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
})

userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);