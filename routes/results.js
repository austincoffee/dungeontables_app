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
        // source: { // advanced feature to be toggled
        //     sourceName: req.body.sourceName,
        //     sourceLink: req.body.sourceLink
        // }
    });
    try {
        const newResult = await result.save();
        res.redirect(`results/${newResult.id}`);
    } catch {
        res.render(`results/new`, {
            result: result,
            errorMessage: `Error creating Result.`
        });
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        // Show tables that the result is a part of
        // https://youtu.be/UIf1Lh9OZ-k?t=1643
        res.render(`results/show`, {
            result: result
        });
    } catch {
        res.redirect(`/`);
    }
});

router.get(`/:id/edit`, async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        res.render(`results/edit`, { result: result });
    } catch {
        res.redirect(`/results`);
    }
});

router.put(`/:id`, async (req, res) => {
    let result;
    try {
        result = await Result.findById(req.params.id);
        result.name = req.body.name;
        result.href = req.body.href;
        result.dsc = req.body.dsc;
        await result.save();
        res.redirect(`/results/${result.id}`);
    } catch {
        if (author == null) {
            res.redirect(`/`);
        } else {
            res.render(`results/edit`, {
                result: result,
                errorMessage: `Error updating Result.`
            });
        }
    }
});

router.delete(`/:id`, async (req, res) => {
    let result;
    try {
        result = await Result.findById(req.params.id);
        await result.remove ();
        res.redirect(`/results`);
    } catch {
        if (author == null) {
            res.redirect(`/`);
        } else {
            res.redirect(`/results/${result.id}`);
        }
    }
});

module.exports = router;