const express = require(`express`);
const router = express.Router();
const Result = require(`../models/result`);

// All Results Route
router.get(`/`, async (req, res) => {
    let searchOptions = {};
    if (req.query != null && req.query != ``) {
        searchOptions.name = new RegExp(req.query.name, `i`);
    }
    try {
        const results = await Result.find(searchOptions);
        res.render(`results/index`, {
            results: results,
            searchOptions: req.query
        });
    } catch {
        res.redirect(`/`);
    }
});

// New Result Route
router.get(`/new`, (req, res) => {
    res.render(`results/new`, { result: new Result() });
});

// Create Result Route
router.post(`/`, async (req, res) => {
    const result = new Result({
        name: req.body.name,
        href: req.body.href,
        dsc: req.body.dsc
    });
    try {
        const newResult = await result.save();
        // res.redirect(`results/${newResult.id}`);
        res.redirect(`results`);
    } catch {
        res.render(`results/new`, {
            result: result,
            errorMessage: `Error creating result.`
        });
    }
});

module.exports = router;