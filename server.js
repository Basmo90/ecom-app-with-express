const express = require('express');
const session = require('express-session');
const passport = require('passport');
const SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Routers
const authRouter = require('./ecomapp/source/Login/auth');
const userRoutes = require('./ecomapp/source/users/routes');
const productRoutes = require('./ecomapp/source/products/routes');
const customerRoutes = require('./ecomapp/source/customers/routes');
const cartRoutes = require('./ecomapp/source/cart/routes');
const checkoutRoutes = require('./ecomapp/source/checkout/routes');
const orderRoutes = require('./ecomapp/source/orders/routes');


const app = express();
const port = 5001;

// Set up view engine for rendering pages
app.set('view engine', 'ejs');
app.set('views', './ecomapp/views'); // Ensure this path points to your views directory

// Parse incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ensure the directory for the SQLite database file exists
const dbDir = path.join(__dirname, 'var', 'db');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Session management with SQLite store
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: dbDir })
}));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Passport authentication middleware
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

// Swagger documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Home route
app.get("/", (req, res) => {
    res.render('home', { user: req.user }); // Renders home.ejs and passes user info
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/auth', authRouter);


// Start the server
app.listen(port, () => console.log(`App listening on port ${port}`));