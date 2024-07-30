const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require("connect-flash");
var usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');

const app = express();
app.set('view engine', 'ejs');

app.use(flash());
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);

passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
