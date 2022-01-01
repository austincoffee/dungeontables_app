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
    const allTables = await Table.find();
    const allOutcomes = await Outcome.find();
    res.render(`tables/new`, {
        table: new Table(),
        tables: allTables, // change to allTables
        outcomes: allOutcomes // change to allOutcomes
    });
});

router.post(`/`, async (req, res) => {
    const allOutcomes = await Outcome.find();
    const allTables = await Table.find();

    // new
    // const resultIDsPosted = rtnResultIDsPosted(req.body.result);

    // old
    let resultIDsReal = [];
    for (let i = 0; i < req.body.result.length; i++) {
        if (!req.body.result[i]) continue;
        resultIDsReal = [...resultIDsReal, req.body.result[i], ];
    };

    // new
    // const [resultNames, resultTypes] = rtnPostedResultNamesAndTypes(resultIDsPosted);

    //old
    let resultNames = [];
    let resultTypes = [];
    for (let i = 0; i < resultIDsReal.length; i++) {
        const resultOutcome = await Outcome.findById(resultIDsReal[i]);
        const resultTable = await Table.findById(resultIDsReal[i]);
        let resultName, resultType;
        resultOutcome ? resultName = resultOutcome.name : resultName = resultTable.name;
        resultNames = [...resultNames, resultName, ];
        resultOutcome ? resultType = `outcome` : resultType = `table`;
        resultTypes = [...resultTypes, resultType, ];
    };

    // new
    // const resultProbsPosted = rtnResultProbsPosted(req.body.prob, req.body.result);

    // old
    let probsReal = [];
    for (let i = 0; i < req.body.prob.length; i++) {
        if (!req.body.prob[i] || !req.body.result[i]) continue;
        probsReal = [...probsReal, req.body.prob[i], ];
    };

    // new
    // const results_id_prob = rtnResults_id_prob(resultIDsPosted, resultProbsPosted);

    // old
    let resultIDsResultNamesProbs = [];
    for (let i = 0; i < resultIDsReal.length; i++) {
        resultIDsResultNamesProbs = [...resultIDsResultNamesProbs, [resultIDsReal[i], resultNames[i], probsReal[i], resultTypes[i], ], ];
    };

    const table = new Table({
        name: req.body.name,
        dsc: req.body.dsc,
        resultIDsResultNamesProbs: resultIDsResultNamesProbs, // old
        // resultIDs: resultIDsPosted, // new
        // resultProbs: resultProbsPosted // new
    });
    try {
        if (u.hasDuplicates(resultNames)) {
            throw `Each Result must have a unique name.`;
        };
        for (let i = 0; i < req.body.prob.length; i++) {
            if (!req.body.prob[i] || !req.body.result[i]) continue;
            if (!parseFloat(req.body.prob[i])) throw `Probabilities must be Numbers.`;
        };
        if (resultIDsResultNamesProbs.length < 2) {
            throw `Table must have at least 2 Results`;
        };

        // new
        // for (let i = 0; i < results_id_prob.length; i++) {
        //     if (!results_id_prob[i][1]) {
        //         throw `Each Result must have a Probability.`;
        //         // Not true -- if prob is left blank, set it equal to the average value
        //     };
        //     await Outcome.updateOne({ _id: results_id_prob[i][0] }, { $addToSet: { assocTables: table.id } }); // there might be a better option
        // };

        // old
        for (let i = 0; i < resultIDsResultNamesProbs.length; i++) {
            if (!resultIDsResultNamesProbs[i][2]) {
                throw `Each Result must have a Probability.`;
                // Not true -- if prob is left blank, set it equal to the average value
            };
            await Outcome.updateOne({ _id: resultIDsResultNamesProbs[i][0] }, { $addToSet: { assocTables: table.id } });
        };

        const newTable = await table.save();
        res.redirect(`tables/${newTable.id}`);
    } catch (e) {
        res.render(`tables/new`, {
            table: table,
            errorMessage: `Error creating Table. ${e}`,
            tables: allTables, // change key to allTables
            outcomes: allOutcomes, // change key to allOutcomes
            resultIDsResultNamesProbs: resultIDsResultNamesProbs, // old
            // resultIDs: resultIDsPosted, // new
            // resultProbs: resultProbsPosted // new
        });
    };
});

router.get(`/:id`, async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        let newResults_id_name_prob_type = [];
        for (let i = 0; i < table.resultIDsResultNamesProbs.length; i++) {
            let result;
            const resultOutcome = await Outcome.findById(table.resultIDsResultNamesProbs[i][0]);
            const resultTable = await Table.findById(table.resultIDsResultNamesProbs[i][0]);
            resultOutcome ? result = resultOutcome : result = resultTable;
            newResults_id_name_prob_type = [...newResults_id_name_prob_type,
                                                [result.id, result.name, table.resultIDsResultNamesProbs[i][2], table.resultIDsResultNamesProbs[i][3]], 
                                            ];
        };
        table.resultIDsResultNamesProbs = newResults_id_name_prob_type;
        await table.save();
        const appearsIn = await rtnAppearsIn(table.id);
        res.render(`tables/show`, {
            table: table,
            resultIDsResultNamesProbs: table.resultIDsResultNamesProbs,
            appearsIn: appearsIn
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
        let resultTypes = [];
        for (let i = 0; i < resultIDsReal.length; i++) {
            const resultOutcome = await Outcome.findById(resultIDsReal[i]);
            const resultTable = await Table.findById(resultIDsReal[i]);
            let resultName, resultType;
            resultOutcome ? resultName = resultOutcome.name : resultName = resultTable.name;
            resultOutcome ? resultType = `outcome` : resultType = `table`;
            resultTypes = [...resultTypes, resultType, ];
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
            resultIDsResultNamesProbs = [...resultIDsResultNamesProbs, [resultIDsReal[i], resultNames[i], probsReal[i], resultTypes[i], ], ];
            await Outcome.updateOne({ _id: resultIDsResultNamesProbs[i][0] }, { $addToSet: { assocTables: table.id } });
        };
        if (u.hasDuplicates(resultNames)) {
            throw `Each Result must have a unique name.`;
        }
        if (resultIDsResultNamesProbs.length < 2) {
            throw `Table must have at least 2 Results`;
        };
        for (let i = 0; i < resultIDsResultNamesProbs.length; i++) {
            if (!resultIDsResultNamesProbs[i][2]) {
                throw `Each Result must have a Probability.`;
                // Not true -- if prob is left blank, set it equal to the average value
            };
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
        const allTables = await Table.find();
        for (let i = 0; i < allTables.length; i++) {
            for (let k = 0; k < allTables[i].resultIDsResultNamesProbs.length; k++) {
                if (allTables[i].resultIDsResultNamesProbs[k][0] === table.id) {
                    throw `Cannot delete a Table that is part of a different Table.`;
                };
            };
        };
        await table.remove();
        res.redirect(`/tables`);
    } catch (e) {
        if (table == null) {
            res.redirect(`/`);
        } else {
            console.log(e);
            res.render(`tables/show`, {
                errorMessage: e,
                table: table,
                resultIDsResultNamesProbs: table.resultIDsResultNamesProbs
            });
        };
    };
});

router.post(`/:id/gen`, async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        const appearsIn = await rtnAppearsIn(table.id);
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
        const outcomeGenPath = tableParsed.rstPath();
        const outcomeGenName = outcomeGenPath[0].name;
        const outcomeGenID = rtnOutcomeGenID(outcomeGenName, table.resultIDsResultNamesProbs);
        res.render(`tables/show`, {
            table: table,
            appearsIn: appearsIn,
            outcomeGenID: outcomeGenID,
            outcomeGenName: outcomeGenName,
            resultIDsResultNamesProbs: table.resultIDsResultNamesProbs
        });
    } catch {
        res.redirect(`/tables/${req.params.id}`);
    }
});

const rtnAppearsIn = async (id) => {
    try {
        const allTables = await Table.find();
        let appearsIn = [];
        for (let i = 0; i < allTables.length; i++) {
            for (let k = 0; k < allTables[i].resultIDsResultNamesProbs.length; k++) {
                if (allTables[i].resultIDsResultNamesProbs[k][0] !== id) continue;
                appearsIn = [...appearsIn, allTables[i]];
            };
        };
        return appearsIn;
    } catch {
        res.render(`/`);
    }
};

const rtnOutcomeGenID = (name, results) => {
    for (let i = 0; i < results.length; i++) {
        if (results[i][1] !== name) continue;
        return results[i][0];
    }
    throw `The name of the provided Outcome does not match any Results in the Table.`;
};

const rtnResultIDsPosted = reqBodyResult => {
    let resultIDsPosted = [];
        for (let i = 0; i < reqBodyResult.length; i++) {
            if (!reqBodyResult[i]) continue;
            resultIDsPosted = [...resultIDsReal, reqBodyResult[i], ];
        };
    return resultIDsPosted;
};

const rtnPostedResultNamesAndTypes = async resultIDsPosted => {
    let resultNames = [];
    let resultTypes = [];
    for (let i = 0; i < resultIDsPosted.length; i++) {
        const resultOutcome = await Outcome.findById(resultIDsPosted[i]); // needs to be inside a try catch
        const resultTable = await Table.findById(resultIDsPosted[i]); // needs to be inside a try catch
        let resultName, resultType;
        resultOutcome ? resultName = resultOutcome.name : resultName = resultTable.name;
        resultNames = [...resultNames, resultName, ];
        resultOutcome ? resultType = `outcome` : resultType = `table`;
        resultTypes = [...resultTypes, resultType, ];
    };
    return [resultNames, resultTypes];
}

const rtnResultProbsPosted = (reqBodyProb, reqBodyResult) => {
    let probsPosted = [];
    for (let i = 0; i < reqBodyProb.length; i++) {
        if (!reqBodyProb[i] || !reqBodyResult[i]) continue;
        probsPosted = [...probsPosted, reqBodyProb[i], ];
    };
    return probsPosted;
};

const rtnResults_id_prob = (resultIDsPosted, resultProbsPosted) => {
    let rtnResults_id_prob = [];
    for (let i = 0; i < resultIDsPosted.length; i++) {
        // rtnResults_id_prob = [...rtnResults_id_prob, [resultIDsPosted[i], resultNames[i], resultProbsPosted[i], resultTypes[i], ], ];
        rtnResults_id_prob = [...rtnResults_id_prob, [ resultIDsPosted[i], resultProbsPosted[i], ], ];
    };
    return rtnResults_id_prob;
}

module.exports = router;