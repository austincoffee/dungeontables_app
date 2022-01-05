const express = require(`express`);
const router = express.Router();
const passport = require(`passport`);

// router.get(`/login`, checkNotAuthenticated, (req, res) => {
//     res.send(`LOGIN`); // get working
//     // res.render(`login.ejs`);
// });

router.get(`/login`, (req, res) => {
    res.send(`LOGIN`); // get working
    // res.render(`login.ejs`);
});

router.post(`/login`, checkNotAuthenticated, passport.authenticate(`local`, {
    successRedirect: `/`,
    failureRedirect: `/login`,
    failureFlash: true
}));

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect(`/`);
    }
    next();
};

module.exports = router;