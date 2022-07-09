// Pulls in required dependencies
require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
// Import express-handlebars
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const schedule = require('node-schedule');

const routes = require('./controllers');
// Import the connection object - config directory - connection.js file
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// Gives express name app
const app = express();
// Port 3001 on machine - hosting service
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
    secret: process.env.SECRET || 'super secret blastoff secret',
    cookie: {
        maxAge: 10 * 60 * 1000 // 10 minutes
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware - form submission JSON object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// Daily api sync
schedule.scheduleJob('0 0 * * *', helpers.checkNewLaunchData());

// turn on connection to db and server
// Force true to drop/recreate table(s) on every sync
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
