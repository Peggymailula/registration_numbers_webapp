const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const pg = require('pg');

const { Pool } = pg;

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  // eslint-disable-next-line no-unused-vars
  useSSL = true;
}

const Registrations = require('./services/reg');
const Regweb = require('./routes/reg-routes');

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registration';

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(session({
  secret: 'My error messages',
  cookie: {
    maxAge: 2000,
  },
  resave: false,
  saveUninitialized: true,
}));

// initialise the flash middleware
app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const registration = Registrations(pool);
const regnum = Regweb(registration);

app.get('/', regnum.home);

app.post('/reg_number', regnum.setReg);

app.get('/reg_numbers', regnum.filterReg);
app.post('/reg_numbers', regnum.viewReg);
app.post('/showAll', regnum.allReg);
app.post('/reset', regnum.resetReg);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('app started at port');
});
