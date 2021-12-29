const express = require(`express`);
const router = express.Router();

// All Tables Route
router.get(`/`, (req, res) => {
    res.render(`tables/index`);
});

// New Table Route
router.get(`/new`, (req, res) => {
    res.render(`tables/new`);
});

// Create Table Route
router.post(`/`, (req, res) => {
    res.send(`Table Created`);
});

module.exports = router;