if (process.env.NODE_ENV != `production`) {
  require(`dotenv`).config(); // .parse() instead?
}

const express = require(`express`);
const app = express();
const expressLayouts = require(`express-ejs-layouts`);
const bcrypt = require(`bcrypt`);
const passport = require(`passport`);
const flash = require(`express-flash`);
const session = require(`express-session`);
const bodyParser = require(`body-parser`);
const methodOverride = require(`method-override`);
// const jquery = require(`jquery`); // need?
 
// const loginRouter = require(`./routes/login`);
// const indexRouter = require(`./routes/index`);
// const registerRouter = require(`./routes/register`);
const outcomeRouter = require(`./routes/outcomes`);
const tableRouter = require(`./routes/tables`);
const genRouter = require(`./routes/gen`);

const initializePassport = require(`./passport-config`);

app.set(`view engine`, `ejs`);
app.set(`views`, __dirname + `/views`);
app.set(`layout`, `layouts/layout`);
app.use(expressLayouts);
app.use(express.static(`public`));
// app.use(express.cookieParser());
// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ limit: `10mb`, extended: false }));

const mongoose = require(`mongoose`);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on(`error`, error => console.error(error));
db.once(`open`, () => console.log(`-|-|-|-> Connected to Mongoose. <-|-|-|-`));

const User = require(`./models/user`);

initializePassport(
  passport,
  email => User.findOne({ "email": email }),
  id => User.findById(id)
);

app.use(express.json());
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride(`_method`));

// app.use(`/`, indexRouter);
// app.use(`/login`, loginRouter);
// app.use(`/register`, registerRouter);
app.use(`/outcomes`, outcomeRouter);
app.use(`/tables`, tableRouter);
app.use(`/gen`, genRouter);
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get(`/`, checkAuthenticated, (req, res) => {
  res.render(`index.ejs`, {
    user: req.user
  });
});

app.get(`/login`, checkNotAuthenticated, (req, res) => {
  res.render(`login.ejs`);
});

app.post(`/login`, checkNotAuthenticated,
  passport.authenticate(`local`, {
    successRedirect: `/`,
    failureRedirect: `/login`,
    failureFlash: true
  }),
);

app.get(`/register`, checkNotAuthenticated, (req, res) => {
  res.render(`register.ejs`);
});

app.post(`/register`, checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const e = await valPreexisting(req.body.email, req.body.username);
    if (e) throw e;
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.redirect(`/login`);
  } catch(e) {
    res.render(`register.ejs`, {
      errorMessage: `Error: ${e}`,
    });
  }
});

app.delete(`/logout`, (req, res) => {
  req.logOut();
  res.redirect(`/login`);
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect(`/login`);
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect(`/`);
  }
  next();
}

const valPreexisting = async (email, username) => {
  let e;
  const preexistingEmail = await User.findOne({ "email": email });
  if (preexistingEmail) e = `User with that email already exists.`
  const preexistingUsername = await User.findOne({ "username": username });
  if (preexistingUsername) e = `User with that username already exists.`
  if (e) {
    return e;
  }
};

app.listen(process.env.PORT || 3000);