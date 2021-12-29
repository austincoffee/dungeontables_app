const express = require(`express`);
const router = express.Router();

// All Tables Route
router.get(`/`, (req, res) => {
    res.render(`gen/index`);
});

module.exports = router;