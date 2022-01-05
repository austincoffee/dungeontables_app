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
    allTables: allTables,
    allOutcomes: allOutcomes
  });
});

router.post(`/`, async (req, res) => {
  let allOutcomes, allTables, resultIDsSubmitted, resultProbsPosted, resultNames;
  const table = new Table({
    name: req.body.name,
    dsc: req.body.dsc
  });
  if (req[`user`]) table.userID = req[`user`].id;
  try {
    allOutcomes = await Outcome.find();
    allTables = await Table.find();
    resultIDsSubmitted = rtnResultIDsSubmitted(req.body.result);
    table.resultIDs = resultIDsSubmitted;
    [resultNames, resultTypes] = await rtnPostedResultNamesAndTypes(resultIDsSubmitted); // condense?
    resultProbsPosted = rtnResultProbsPosted(req.body.prob, req.body.result);
    table.resultProbs = resultProbsPosted;
    const results_id_prob = rtnResults_id_prob(resultIDsSubmitted, resultProbsPosted);
    valName(req.body.name);
    valTableLength(resultIDsSubmitted);
    valDuplicates(resultNames);
    valHasProbabilities(results_id_prob); // If prob is blank, set to average value (can be disabled in "Advanced")
    valProbabilityNumbers(req.body.prob, req.body.result);
    const newTable = await table.save();
    console.log(newTable);
    res.redirect(`tables/${newTable.id}`);
  } catch (e) {
    if (!table || !allOutcomes || !allTables) {
      res.redirect(`/`);
    } else {
      res.render(`tables/new`, {
        table: table,
        errorMessage: `Error creating Table. ${e}`,
        allTables: allTables,
        allOutcomes: allOutcomes,
        resultIDs: resultIDsSubmitted,
        resultProbs: resultProbsPosted,
        resultNames: resultNames,
      });
    }
  };
});

router.get(`/:id`, async (req, res) => {
  try {
    const tableParsed = await rtnTableParsed(req.params.id);
    const appearsIn = await rtnAppearsIn(tableParsed._id);
    res.render(`tables/show`, {
      table: tableParsed,
      appearsIn: appearsIn
    });
  } catch (e) {
    console.log(e);
    res.redirect(`/`);
  };
});

router.get(`/:id/edit`, async (req, res) => {
  try {
    const allTables = await Table.find();
    const allOutcomes = await Outcome.find();
    const table = await Table.findById(req.params.id);
    const [resultNames] = await rtnPostedResultNamesAndTypes(table.resultIDs);
    res.render(`tables/edit`, {
      table: table,
      allTables: allTables,
      allOutcomes: allOutcomes,
      resultNames: resultNames
    });
  } catch {
    res.redirect(`/tables`);
  };
});

router.put(`/:id`, async (req, res) => {
  let table, allOutcomes, allTables, resultNames;
  try {
    table = await Table.findById(req.params.id);
    allOutcomes = await Outcome.find();
    allTables = await Table.find();
    const resultIDsSubmitted = rtnResultIDsSubmitted(req.body.result);
    valTableDoesNotContainItself(table.id, resultIDsSubmitted);
    [resultNames] = await rtnPostedResultNamesAndTypes(resultIDsSubmitted);
    valName(req.body.name);
    valTableLength(resultIDsSubmitted);
    valDuplicates(resultNames);
    const resultProbsPosted = rtnResultProbsPosted(req.body.prob, req.body.result);
    const results_id_prob = rtnResults_id_prob(resultIDsSubmitted, resultProbsPosted);
    valHasProbabilities(results_id_prob);
    valProbabilityNumbers(req.body.prob, req.body.result);
    table.name = req.body.name;
    table.dsc = req.body.dsc;
    table.resultIDs = resultIDsSubmitted;
    table.resultProbs = resultProbsPosted;
    await table.save();
    res.redirect(`/tables/${table.id}`);
  } catch (e) {
    if (table == null || !allOutcomes || !allTables) {
      res.redirect(`/`);
    } else {
      res.render(`tables/edit`, {
        table: table,
        errorMessage: `Error updating Table. ${e}`,
        allOutcomes: allOutcomes,
        allTables: allTables,
        resultNames: resultNames
      });
    };
  };
});

router.delete(`/:id`, async (req, res) => {
  let table, allTables, resultNames, resultTypes, appearsIn;
  try {
    table = await Table.findById(req.params.id);
    [resultNames, resultTypes] = await rtnPostedResultNamesAndTypes(table.resultIDs);
    allTables = await Table.find();
    appearsIn = await rtnAppearsIn(table.id);
    for (let i = 0; i < allTables.length; i++) {
      for (let k = 0; k < allTables[i].resultIDs.length; k++) {
        if (allTables[i].resultIDs[k] === table.id) {
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
      res.render(`tables/show`, {
        errorMessage: e,
        table: table,
        resultIDs: table.resultIDs,
        resultProbs: table.resultProbs,
        resultNames: resultNames,
        resultTypes: resultTypes,
        appearsIn: appearsIn,
      });
    };
  };
});

router.post(`/:id/gen`, async (req, res) => {
  try {
    const tableParsed = await rtnTableParsed(req.params.id);
    const appearsIn = await rtnAppearsIn(tableParsed._id);
    const tableParsedT = new T ({
      name: tableParsed._id,
      ents: tableParsed.ents
    });
    const outcomeGenPath = tableParsedT.rstPath();
    res.render(`tables/show`, {
      table: tableParsed,
      appearsIn: appearsIn,
      outcomeGenPath: outcomeGenPath
    });
  } catch {
    res.redirect(`/tables/${req.params.id}`);
  };
});

router.post(`/:id/modifyRows`, async(req, res) => {
  const [trCount, newOrEdit] = req.body.modifyRowValues.split(`,`);
  try {
    const allTables = await Table.find();
    const allOutcomes = await Outcome.find();
    if (newOrEdit === `new`) {
      res.render(`tables/new`, {
        allTables: allTables,
        allOutcomes: allOutcomes,
        table: new Table(),
        trCount: trCount
      });
    } else if (newOrEdit === `edit`) {
      const table = await Table.findById(req.params.id);
      const [resultNames] = await rtnPostedResultNamesAndTypes(table.resultIDs);
      res.render(`tables/edit`, {
        table: table,
        allTables: allTables,
        allOutcomes: allOutcomes,
        resultNames: resultNames,
        trCount: trCount
      });
    }
  } catch (e) {
    console.log(e);
    res.redirect(`/tables`);
  };
});

const rtnAppearsIn = async id => {
  try {
    const allTables = await Table.find();
    let appearsIn = [];
    for (let i = 0; i < allTables.length; i++) {
      for (let k = 0; k < allTables[i].resultIDs.length; k++) {
        if (allTables[i].resultIDs[k] !== id) continue;
        appearsIn = [...appearsIn, allTables[i]];
      };
    };
    return appearsIn;
  } catch (e) { // does this actually work?
    console.log(e);
    res.render(`/`);
  }
};

// new // don't use this
const rtnResultIDsSubmitted = reqBodyResult => { // should never have to handle one value
  let reqBodyResultParsed = reqBodyResult;
  if (!Array.isArray(reqBodyResult)) reqBodyResultParsed = [reqBodyResult];
  let resultIDsSubmitted = [];
  for (let i = 0; i < reqBodyResultParsed.length; i++) {
    if (!reqBodyResultParsed[i]) continue;
    resultIDsSubmitted = [...resultIDsSubmitted, reqBodyResultParsed[i], ];
  };
  return resultIDsSubmitted;
};

// old - use this
// const rtnResultIDsSubmitted = reqBodyResult => { // should never have to handle one value
//   let resultIDsSubmitted = [];
//   for (let i = 0; i < reqBodyResult.length; i++) {
//     if (!reqBodyResult[i]) continue;
//     resultIDsSubmitted = [...resultIDsSubmitted, reqBodyResult[i], ];
//   };
//   return resultIDsSubmitted;
// };

const rtnPostedResultNamesAndTypes = async (resultIDsSubmitted) => {
  try {
    let resultNames = [];
    let resultTypes = [];
    for (let i = 0; i < resultIDsSubmitted.length; i++) {
      const resultOutcome = await Outcome.findById(resultIDsSubmitted[i]);
      const resultTable = await Table.findById(resultIDsSubmitted[i]);
      let resultName, resultType;
      resultOutcome ? resultName = resultOutcome.name : resultName = resultTable.name;
      resultNames = [...resultNames, resultName, ];
      resultOutcome ? resultType = `outcome` : resultType = `table`;
      resultTypes = [...resultTypes, resultType, ];
    };
    const resultNamesAndTypes = [resultNames, resultTypes];
    return resultNamesAndTypes;
  } catch (e) {
    console.log(e);
    res.render(`/`);
  }
};

const rtnResultProbsPosted = (reqBodyProb, reqBodyResult) => {
  let probsPosted = [];
  for (let i = 0; i < reqBodyProb.length; i++) {
    if (!reqBodyProb[i] || !reqBodyResult[i]) continue;
    probsPosted = [...probsPosted, reqBodyProb[i], ];
  };
  return probsPosted;
};

const rtnResults_id_prob = (resultIDsSubmitted, resultProbsPosted) => {
  let rtnResults_id_prob = [];
  for (let i = 0; i < resultIDsSubmitted.length; i++) {
    rtnResults_id_prob = [...rtnResults_id_prob, [ resultIDsSubmitted[i], resultProbsPosted[i], ], ];
  };
  return rtnResults_id_prob;
};

const rtnDoesTableContainItself = (tableID, resultIDs) => {
  for (let i = 0; i < resultIDs.length; i++) {
    if (resultIDs[i] !== tableID) continue;
    return true;
  };
  return false;
};

const valTableDoesNotContainItself = (tableID, resultIDs) => {
  const doesTableContainItself = rtnDoesTableContainItself(tableID, resultIDs);
  if (doesTableContainItself) throw `The Table cannot contain itself as a Result.`;
};

const rtnResults = async table => {
  try {
    const allResults = await rtnAllResults();
    let results = [];
    for (let i = 0; i < table.resultIDs.length; i++) {
      for (let k = 0; k < allResults.length; k++) {
        if (table.resultIDs[i] !== allResults[k].id) continue;
        results = [...results, allResults[k], ];
      };
    };
    return results;
  } catch {
    console.log(`CATCH`);
  };
};

const rtnAllResults = async () => {
  try {
    const allTables = await Table.find();
    const allOutcomes = await Outcome.find();
    const allResults = allTables.concat(allOutcomes);
    return allResults;
  } catch {
    console.log(`rtnAllResults CATCH`);
  }
};

const rtnTableParsed = async tableID => {
  try {
    const table = await Table.findById(tableID);
    const results = await rtnResults(table);
    const tableCopy = u.rtnObjDeepCopy(table);
    const resultsParsed = await parseResults(tableCopy, results);
    tableCopy.ents = resultsParsed;
    return tableCopy;
  } catch (e) {
    console.log(e);
  }
};

const parseResults = async (table, results) => {
  try {
    let parsedResults = [];
    for (let i = 0; i < results.length; i++) {
      if (results[i].resultIDs) {
        const subResults = await rtnResults(results[i]);
        populatedSubResults = await parseResults(results[i], subResults);
        const resultsIcopy = u.rtnObjDeepCopy(results[i]);
        resultsIcopy.ents = populatedSubResults;
        parsedResults = [...parsedResults, [resultsIcopy, table.resultProbs[i], ], ];
      } else {
        parsedResults = [...parsedResults, [results[i], table.resultProbs[i], ], ];
      };
    };
    return parsedResults;
  } catch (e) {
    console.log(e);
  }
};

const rtnNewOrEdit = reqBody => {
  console.log(reqBody);
  if (typeof reqBody.resultIDs == null) {
    return false;
  } else return true;
};

const valName = (reqBodyName) => {
  if (!reqBodyName) throw `DungeonTable is missing a Name.`
};

const valTableLength = resultIDsSubmitted => {
  if (resultIDsSubmitted.length < 2) {
    throw `Table must have at least 2 Results.`;
  };
};

const valDuplicates = resultNames => {
  if (u.hasDuplicates(resultNames)) {
    throw `Each Result must have a unique Name.`;
  };
};

const valHasProbabilities = results_id_prob => {
  for (let i = 0; i < results_id_prob.length; i++) {
    if (!results_id_prob[i][1]) {
      throw `Each Result must have a Probability.`;
    };
  };
};

const valProbabilityNumbers = (reqBodyProb, reqBodyResult) => {
  for (let i = 0; i < reqBodyProb.length; i++) {
    if (!reqBodyProb[i] || !reqBodyResult[i]) continue;
    if (!parseFloat(reqBodyProb[i])) throw `Probabilities must be Numbers.`;
  };
};

module.exports = router;