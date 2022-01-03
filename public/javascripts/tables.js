const u = require(`./utils`);
// import {u} from "./utils.js";
// export {T, R};

class T {
    constructor({
      name = `Default Name`,
      ents = [
        `Default Ent`,
      ],
    }) {
      this.name = name;
      this.ents = ents;
      this.rtnPctTables();
    }
    rtnPctTables() {
      const objPctTable = this.rtnPctTableFrmWeightedTable(this);
      this.ents = objPctTable.ents;
    }
    rstPath() {
      const rstPath = this.rtnRstPathFrmNestedTables(this);
      const ent = rstPath[rstPath.length - 1];
      const entCopy = u.rtnObjDeepCopy(ent);
      let rst = this.rtnResultWithTraits(entCopy);
      if (u.isStr(rst)) {
        rst = {
          name: rst,
        }
      }
      const rstPathWithRst = this.rtnRstPathWithRst(rstPath, rst);
      return rstPathWithRst;
    }
    rtnRstPathWithRst(rstPath, rst) {
      let rstPathWithRst = [];
      for (let i = 0; i < rstPath.length; i++) {
        if (i === rstPath.length - 1) {
          rstPathWithRst = [...rstPathWithRst, rst];
          return rstPathWithRst;
        } else rstPathWithRst = [...rstPathWithRst, rstPath[i]];
      }
    }
    rtnResultWithTraits(ent) {
      if (ent.traits) {
        for (const trait in ent.traits) {
          if (this.isTable(ent.traits[trait])) {
            const randTrait = this.rtnEntFrmNestedTables(ent.traits[trait]);
            ent.traits[trait] = randTrait;
          }
        }
        return ent;
      }
      return ent;
      }
    rtnEntFrmNestedTables(table) {
      const pctTable = this.rtnPctTableFrmWeightedTable(table);
      const ent = this.rtnEntFrmNestedPctTables(pctTable);
      return ent;
    }
    rtnRstPathFrmNestedTables(table) {
      const pctTable = this.rtnPctTableFrmWeightedTable(table);
      const rstPath = this.rtnRstPathFrmNestedPctTables(pctTable);
      return rstPath;
    }
    rtnEntFrmNestedPctTables(table) {
      const cast = this.rtnCast();
      const tableEnt = this.rtnEntFrmTableAndCast(table, cast);
      let tableEntsArr = [];
      tableEntsArr = [...tableEntsArr, tableEnt];
      for ( ; ; ) {
        if (!this.isTable(tableEntsArr[tableEntsArr.length - 1])) break;
        const castNew = this.rtnCast();
        const tableEntNew = this.rtnEntFrmTableAndCast(tableEntsArr[tableEntsArr.length - 1], castNew);
        tableEntsArr = [...tableEntsArr, tableEntNew];
      }
      return tableEntsArr[tableEntsArr.length - 1];
    }
    rtnRstPathFrmNestedPctTables(table) {
      const cast = this.rtnCast();
      const tableEnt = this.rtnEntFrmTableAndCast(table, cast);
      let rstPath = [];
      rstPath = [...rstPath, tableEnt];
      for ( ; ; ) {
        if (!this.isTable(rstPath[rstPath.length - 1])) break;
        const castNew = this.rtnCast();
        const tableEntNew = this.rtnEntFrmTableAndCast(rstPath[rstPath.length - 1], castNew);
        rstPath = [...rstPath, tableEntNew];
      }
      return rstPath;
    }
    isTable = table => table && table.ents;
    rtnCast = () => {
      const randInt = u.rtnRandInt(1, 100);
      const randFloat = randInt * (10 ** -2);
      const randFloatRound = u.roundToDecimalPlaces(randFloat, 2);
      return randFloatRound;
    }
    rtnEntFrmTableAndCast(table, cast) {
      const rangedTable = this.rtnRangedTableFrmTable(table);
      const ent = this.rtnEntFrmRangedTable(rangedTable, cast);
      return ent;
    }
    rtnEntFrmRangedTable(rangedTable, cast) {
      for (let i = 0; i < rangedTable.ents.length; i++) {
        const name = rangedTable.ents[i][0];
        const prbRngLo = rangedTable.ents[i][2];
        const prbRngHi = rangedTable.ents[i][3];
        if (cast >= prbRngLo && cast <= prbRngHi) return name;
      }
    }
    rtnPctTableFrmWeightedTable(table) {
      let tableToCopy = table;
      if (this.isSimpleTable(table)) tableToCopy = this.rtnWeightedTableFrmSimpleTable(table);
      const tableCopy = u.rtnObjDeepCopy(tableToCopy);
      const weightSum = this.rtnWeightSumOfTable(tableCopy);
      const tablePcts = this.rtnTablePctsFrmTableAndWeightSum(tableCopy, weightSum);
      let tablePctEnts = [];
      for (let i = 0; i <= tableCopy.ents.length - 1; i++) {
        let tablePctEnt = [];
        tablePctEnt = [tableCopy.ents[i][0], tablePcts[i]];
        tablePctEnts = [...tablePctEnts, tablePctEnt];
      }
      tableCopy.ents = tablePctEnts;
      return tableCopy;
    }
    rtnWeightedTableFrmSimpleTable = simpleTable => {
      const table = u.rtnObjDeepCopy(simpleTable);
      let tableEnts = [];
      const entWeight = 1 / simpleTable.ents.length;
      const entWeightRound = u.roundToDecimalPlaces(entWeight, 4);
      for (let i = 0; i < simpleTable.ents.length; i++) {
        tableEnts = [...tableEnts, [simpleTable.ents[i], entWeightRound]];
      }
      table.ents = tableEnts;
      return table;
    }
    isSimpleTable(simpleTable) {
      if (!Array.isArray(simpleTable.ents)) return false;
      let isElLength2Arr = [];
      for (const ent in simpleTable.ents) { // will throw errors for results that haven't been converted to class
        (simpleTable.ents[ent].length === 2)
          ? isElLength2Arr = [...isElLength2Arr, true]
          : isElLength2Arr = [...isElLength2Arr, false];
      }
      for (const el in isElLength2Arr) if (!isElLength2Arr[el]) return true;
      return false;
    }
    rtnRangedTableFrmTable(table) {
      const pctTable = this.rtnPctTableFrmWeightedTable(table);
      const inc = .0001;
      let rangedTableEnts = [];
      for (let i = 0; i < pctTable.ents.length; i++) {
        const name = pctTable.ents[i][0];
        const prb = pctTable.ents[i][1];
        let prvEntPrbRngHi;
        (rangedTableEnts.length)
          ? prvEntPrbRngHi = rangedTableEnts[rangedTableEnts.length - 1][3]
          : prvEntPrbRngHi = 0;
        const entPrbRngLo = (prvEntPrbRngHi || 0) + inc;
        const entPrbRngLoRound = u.roundToDecimalPlaces(entPrbRngLo, 4)
        const entPrbRngHi = entPrbRngLo + prb - inc;
        const entPrbRngHiRound = u.roundToDecimalPlaces(entPrbRngHi, 4);
        const entRanged = [name, prb, entPrbRngLoRound, entPrbRngHiRound];
        rangedTableEnts = [...rangedTableEnts, entRanged];
      }
      pctTable.ents = rangedTableEnts;
      return pctTable;
    }
    rtnWeightSumOfTable(tableCopy) {
      let weightSum = 0;
      for (const ent in tableCopy.ents) {
        const entWeight = Number.parseFloat(tableCopy.ents[ent][1]);
        weightSum += entWeight;
      }
      const weightSumRound = u.roundToDecimalPlaces(weightSum, 4);
      return weightSumRound;
    }
    rtnTablePctsFrmTableAndWeightSum(table, weightSum) {
      let tablePcts = [];
      for (const ent in table.ents) {
        const entWeight = table.ents[ent][1];
        const entPct = entWeight / weightSum;
        const entPctRound = u.roundToDecimalPlaces(entPct, 4);
        tablePcts = [...tablePcts, entPctRound];
      }
      const adjustedTablePcts = this.adjustTablePcts(tablePcts);
      return adjustedTablePcts;
    }
    adjustTablePcts = tablePcts => {
      const tablePctsSum = u.sumArr(tablePcts);
      const tablePctsSumRound = u.roundToDecimalPlaces(tablePctsSum, 8);
      const dif = 1 - tablePctsSumRound;
      const difRound = u.roundToDecimalPlaces(dif, 8);
      const largestTablePct = u.rtnLargestValueInArr(tablePcts);
      let adjustedTablePcts = [];
      let hasAdjusted = false;
      for (const tablePct in tablePcts) {
        let newTablePct = tablePcts[tablePct];
        if (tablePcts[tablePct] === largestTablePct && !hasAdjusted) {
          newTablePct = tablePcts[tablePct] + difRound;
          newTablePct = u.roundToDecimalPlaces(newTablePct, 4);
          hasAdjusted = true;
        }
        adjustedTablePcts = [...adjustedTablePcts, newTablePct];
      }
      return adjustedTablePcts;
    }
}

class R {
  constructor({
    name = `Default Name`,
    traits = null,
    href = null,
    dsc = null,
  }) {
    this.name = name;
    this.traits = traits;
    this.href = href;
    this.dsc = dsc;
  }
}

// notes:

module.exports = T; // and R ???