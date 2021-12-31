const express = require(`express`);
const router = express.Router();
const Table = require(`../models/table`);
const Outcome = require(`../models/outcome`);
const u = require(`../public/javascripts/utils.js`);
const T = require(`../public/javascripts/tables.js`);

router.get(`/`, async (req, res) => {
    let searchOptions = {};
    if (req.query != null && req.query != ``) {
        searchOptions.name = new RegExp(req.query.name, `i`);
    };
    try {
        const tables = await Table.find(searchOptions);
        res.render(`tables/index`, {
            tables: tables,
            searchOptions: req.query
        });
    } catch {
        res.redirect(`/`);
    };
});

router.get(`/new`, async (req, res) => {
    const tables = await Table.find();
    const outcomes = await Outcome.find();
    res.render(`tables/new`, { table: new Table(), tables: tables, outcomes: outcomes });
});

router.post(`/`, async (req, res) => {
    const outcomes = await Outcome.find();
    const tables = await Table.find();
    let resultIDsReal = [];
    for (let i = 0; i < req.body.result.length; i++) {
        if (!req.body.result[i]) continue;
        resultIDsReal = [...resultIDsReal, req.body.result[i], ];
    };
    let resultNames = [];
    for (let i = 0; i < resultIDsReal.length; i++) {
        const result = await Outcome.findById(resultIDsReal[i]);
        const resultName = result.name;
        resultNames = [...resultNames, resultName, ];
    };
    let probsReal = [];
    for (let i = 0; i < req.body.prob.length; i++) {
        if (!req.body.prob[i] || !req.body.result[i]) continue;
        probsReal = [...probsReal, req.body.prob[i], ];
    };
    let resultIDsResultNamesProbs = [];
    for (let i = 0; i < resultIDsReal.length; i++) {
        resultIDsResultNamesProbs = [...resultIDsResultNamesProbs, [resultIDsReal[i], resultNames[i], probsReal[i]], ];
    };
    const table = new Table({
        name: req.body.name,
        dsc: req.body.dsc,
        resultIDsResultNamesProbs: resultIDsResultNamesProbs
    });
    try {
        for (let i = 0; i < req.body.prob.length; i++) {
            if (!req.body.prob[i] || !req.body.result[i]) continue;
            if (!parseFloat(req.body.prob[i])) throw `Probabilities must be Numbers.`;
        };
        if (resultIDsResultNamesProbs.length < 2) {
            throw `Table must have at least 2 Results`;
        };
        for (let i = 0; i < resultIDsResultNamesProbs.length; i++) {
            if (!resultIDsResultNamesProbs[i][2]) {
                throw `Each Result must have a Probability.`;
            };
            await Outcome.updateOne({ _id: resultIDsResultNamesProbs[i][0] }, { $addToSet: { assocTables: table.id } });
        };
        const newTable = await table.save();
        res.redirect(`tables/${newTable.id}`);
    } catch (e) {
        res.render(`tables/new`, {
            table: table,
            errorMessage: `Error creating Table. ${e}`,
            tables: tables,
            outcomes: outcomes
        });
    };
});

router.get(`/:id`, async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        res.render(`tables/show`, {
            table: table,
        });
    } catch {
        res.redirect(`/`);
    };
});

router.get(`/:id/edit`, async (req, res) => {
    try {
        const tables = await Table.find();
        const outcomes = await Outcome.find();
        const table = await Table.findById(req.params.id);
        res.render(`tables/edit`, { table: table, tables: tables, outcomes: outcomes });
    } catch {
        res.redirect(`/tables`);
    };
});

router.put(`/:id`, async (req, res) => {
    const outcomes = await Outcome.find();
    const tables = await Table.find();
    let table;
    table = await Table.findById(req.params.id);
    try {
        let resultIDsReal = [];
        for (let i = 0; i < req.body.result.length; i++) {
            if (!req.body.result[i]) continue;
            resultIDsReal = [...resultIDsReal, req.body.result[i], ];
        };
        let resultNames = [];
        for (let i = 0; i < resultIDsReal.length; i++) {
            const result = await Outcome.findById(resultIDsReal[i]);
            const resultName = result.name;
            resultNames = [...resultNames, resultName, ];
        };
        let probsReal = [];
        for (let i = 0; i < req.body.prob.length; i++) {
            if (!req.body.prob[i] || !req.body.result[i]) continue;
            if (!parseFloat(req.body.prob[i])) throw `Probabilities must be Numbers.`;
            probsReal = [...probsReal, req.body.prob[i], ];
        };
        let resultIDsResultNamesProbs = [];
        for (let i = 0; i < resultIDsReal.length; i++) {
            resultIDsResultNamesProbs = [...resultIDsResultNamesProbs, [resultIDsReal[i], resultNames[i], probsReal[i]], ];
            await Outcome.updateOne({ _id: resultIDsResultNamesProbs[i][0] }, { $addToSet: { assocTables: table.id } });
        };
        table.name = req.body.name;
        table.dsc = req.body.dsc;
        table.resultIDsResultNamesProbs = resultIDsResultNamesProbs;
        await table.save();
        res.redirect(`/tables/${table.id}`);
    } catch (e) {
        if (table == null) {
            res.redirect(`/`);
        } else {
            res.render(`tables/edit`, {
                table: table,
                errorMessage: `Error updating Table. ${e}`,
                outcomes: outcomes,
                tables: tables
            });
        };
    };
});

router.delete(`/:id`, async (req, res) => {
    let table;
    try {
        table = await Table.findById(req.params.id);
        await table.remove ();
        res.redirect(`/tables`);
    } catch {
        if (author == null) {
            res.redirect(`/`);
        } else {
            res.redirect(`/tables/${table.id}`);
        };
    };
});

router.post(`/:id/gen`, async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        let entsParsed = [];
        for (let i = 0; i < table.resultIDsResultNamesProbs.length; i++) {
            entsParsed = [...entsParsed,
                [table.resultIDsResultNamesProbs[i][1],
                table.resultIDsResultNamesProbs[i][2] * .01]];
        }
        const tableParsed = new T ({
            name: table.name,
            ents: entsParsed
        });
        const outcomeGen = tableParsed.rstPath();
        const outcomeGenName = outcomeGen[0].name;
        const outcomeGenID = rtnOutcomeGenID(outcomeGenName, table.resultIDsResultNamesProbs);
        res.render(`tables/show`, {
            table: table,
            outcomeGenID: outcomeGenID
        });
    } catch {
        res.redirect(`/tables/${req.params.id}`);
    }
});

const rtnOutcomeGenID = (name, results) => {
    for (let i = 0; i < results.length; i++) {
        if (results[i][1] !== name) continue;
        return results[i][0];
    }
    throw `The name of the provided Outcome does not match any Results in the Table.`;
};

module.exports = router;