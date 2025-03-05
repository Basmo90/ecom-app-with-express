const express = require('express');
const session = require('express-session');
const passport = require('passport');
var SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');
var authRouter = require('./ecomapp/source/Login/auth');

const productroutes = require('./ecomapp/source/products/routes');
const customerRoutes = require('./ecomapp/source/customers/routes');

const app = express();
const port = 5001;

// Set view engine
app.set('view engine', 'ejs'); // or 'pug', 'hbs', etc.
app.set('views', './ecomapp/views'); // Ensure this path points to your views directory

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ensure the directory for the SQLite database file exists
const dbDir = path.join(__dirname, 'var', 'db');
const fs = require('fs');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: dbDir })
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.authenticate('session'));

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.render('home', { user: req.user }); // Ensure you have a 'home.ejs' file in your views directory
});

app.use('/api/products', productroutes);
app.use('/api/customers', customerRoutes);
app.use('/auth', authRouter);

app.listen(port, () => console.log(`app listening on port ${port}`));