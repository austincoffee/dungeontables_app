const express = require(`express`);
const router = express.Router();
const Outcome = require(`../models/outcome`);

router.get(`/`, async (req, res) => {
    let searchOptions = {};
    if (req.query != null && req.query != ``) {
        searchOptions.name = new RegExp(req.query.name, `i`);
    }
    try {
        const outcomes = await Outcome.find(searchOptions);
        res.render(`outcomes/index`, {
            outcomes: outcomes,
            searchOptions: req.query
        });
    } catch {
        res.redirect(`/`);
    }
});

router.get(`/new`, (req, res) => {
    res.render(`outcomes/new`, { outcome: new Outcome() });
});

router.post(`/`, async (req, res) => {
    const outcome = new Outcome({
        name: req.body.name,
        href: req.body.href,
        dsc: req.body.dsc
        // source: { // advanced feature to be toggled
        //     sourceName: req.body.sourceName,
        //     sourceLink: req.body.sourceLink
        // }
    });
    try {
        const newOutcome = await outcome.save();
        res.redirect(`outcomes/${newOutcome.id}`);
    } catch {
        res.render(`outcomes/new`, {
            outcome: outcome,
            errorMessage: `Error creating Outcome.`
        });
    }
});

router.get(`/:id`, async (req, res) => {
    try {
        const outcome = await Outcome.findById(req.params.id);
        // Show tables that the outcome is a part of
        // https://youtu.be/UIf1Lh9OZ-k?t=1643
        res.render(`outcomes/show`, {
            outcome: outcome
        });
    } catch {
        res.redirect(`/`);
    }
});

router.get(`/:id/edit`, async (req, res) => {
    try {
        const outcome = await Outcome.findById(req.params.id);
        res.render(`outcomes/edit`, { outcome: outcome });
    } catch {
        res.redirect(`/outcomes`);
    }
});

router.put(`/:id`, async (req, res) => {
    let outcome;
    try {
        outcome = await Outcome.findById(req.params.id);
        outcome.name = req.body.name;
        outcome.href = req.body.href;
        outcome.dsc = req.body.dsc;
        await outcome.save();
        res.redirect(`/outcomes/${outcome.id}`);
    } catch {
        if (outcome == null) {
            res.redirect(`/`);
        } else {
            res.render(`outcomes/edit`, {
                outcome: outcome,
                errorMessage: `Error updating Outcome.`
            });
        }
    }
});

router.delete(`/:id`, async (req, res) => {
    let outcome;
    try {
        outcome = await Outcome.findById(req.params.id);
        await outcome.remove ();
        res.redirect(`/outcomes`);
    } catch {
        if (outcome == null) {
            res.redirect(`/`);
        } else {
            res.redirect(`/outcomes/${outcome.id}`);
        }
    }
});

module.exports = router;