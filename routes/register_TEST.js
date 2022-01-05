const express = require(`express`);
const router = express.Router();

router.get(`/register`, checkNotAuthenticated, (req, res) => {
    res.render(`register.ejs`);
});

router.post(`/register`, checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // const user = { name: req.body.name, password: hashedPassword };
        users.push({ // use mongoDB
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        res.redirect(`/login`);
    } catch {
        res.redirect(`/register`);
    }
});

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect(`/`);
    }
    next();
}

module.exports = router;