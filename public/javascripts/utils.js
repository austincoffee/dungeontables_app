const u = {};

u.doSomething = () => console.log(`did something!`);
u.doSomethingElse = () => console.log(`did something else!`);
u.isOutlyingKey = outlyingKey => {
  return (outlyingKey === `Shift` ||
  outlyingKey === `CapsLock` ||
  outlyingKey === `Tab` ||
  outlyingKey === `Control` ||
  outlyingKey === `Alt` ||
  outlyingKey === `Meta` ||
  outlyingKey === `Enter` ||
  outlyingKey === `Backspace` ||
  outlyingKey === `ArrowUp` ||
  outlyingKey === `ArrowLeft` ||
  outlyingKey === `ArrowRight` ||
  outlyingKey === `ArrowDown`);
}
u.isBool = bool => { return typeof bool === 'boolean'; }
u.isDate = date => { return date instanceof Date; }
u.isError = err => { return err instanceof Error && typeof err.message !== 'undefined'; }
u.isFunction = func => { return typeof func === 'function'; }
u.isNull = val => { return val === null; }
u.isNum = num => { return typeof num === 'number' && isFinite(num); }
u.isObj = obj => { return value && typeof value === 'object' && obj.constructor === Object; }
u.isRegExp = regExp => { return regExp && typeof regExp === 'object' && regExp.constructor === RegExp; }
u.isStr = str => { return typeof str === 'string' || str instanceof String; }
u.doesStrHaveNum = str => { return (!u.isStr(str)) ? console.log(`u.doesStrHaveNum expects argument to be a string.`) : /\d/.test(str); }
u.isStrLettersOnly = str => { // this is useful only for musical letters -- move to mu
  return /^[a-gA-G]+$/.test(str);
}
u.isSymbol = symbol => { return typeof symbol === 'symbol'; }
u.isUndefined = val => { return typeof val === 'undefined'; }
u.returnArrFromArrsWithMatchingIndexedEl = (arrs, index, el) => {
  for (let i = 0; i < arrs.length; i++) {
    let arr = arrs[i];
    if (arr[index] === el) {
      return arr;
    }
  }
}
u.returnCircularArrs = (sourceArr, numOfClonedArrs) => {
  let arrZero = sourceArr;
  let arrs = [arrZero];
  for (let i = 0; i < numOfClonedArrs; i++) {
    let [targetForCloning] = arrs.slice(-1);
    let arrClone = [...targetForCloning];
    let arrCloneFirstElement = arrClone.shift();
    arrClone.push(arrCloneFirstElement);
    arrs.push(arrClone);
  }
  return arrs;
}
u.returnChunkedArr = (arr, chunkSize) => {
  let tempArr = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    let chunk = arr.slice(i, i + chunkSize);
    tempArr.push(chunk);
  }
  return tempArr;
}
u.returnIndexOfArrWithVal = (arr, val) => {
  for (let i = 0; i < arr.length; i++) {
    let el = arr[i];
    if (el === val) {
      return arr.indexOf(el);
    }
  }
}
u.returnLastArrFromArrsWithMatchingIndexedEl = (arrs, index, el) => {
  for (let i = arrs.length - 1; i >= 0; i--) {
    let arr = arrs[i];
    if (arr[index] === el) {
      return arr;
    }
  };
}
u.returnObjsFromObjArr = ({objArr, isForwards = true, mustReturn = true, howManyObjs = 1, forceArr = false, properties = {}, }) => {
  if (!Array.isArray(objArr)) throw new ReferenceError(`objArr must be an object. objArr: ${objArr}`);
  if (!u.isBool(isForwards) && !u.isUndefined(isForwards)) throw new TypeError(`isForwards must be a bool or undefined. isForwards: ${isForwards}`);
  if (!u.isBool(mustReturn)) throw new TypeError(`mustReturn must be a boolean or undefined: ${mustReturn}`);
  if (!u.isBool(forceArr)) throw new TypeError(`forceArr must be a boolean. forceArr: ${forceArr}`)
  if (!u.isNum(parseInt(howManyObjs)) && !u.isUndefined(howManyObjs)) throw new TypeError(`howManyObjs must be a number or undefined. howManyObjs: ${howManyObjs}`);
  howManyObjs = parseInt(howManyObjs);
  const customProperties = [], customKeys = [], matchingObjs = [];
  for (const property in properties) {
    customKeys.push(property);
    customProperties.push(`${property}: ${properties[property]}`);
  }
  let i = 0, direction = 1, stop = objArr.length;
  if (!isForwards) { i = objArr.length - 1, direction = -1, stop = -1; }
  for ( ; i !== stop; i += direction) {
    const objArrProperties = [];
    for (const property in objArr[i]) {
      if (!customKeys.includes(property)) continue;
      objArrProperties.push(`${property}: ${objArr[i][property]}`)
    }
    for (let j = 0; j < customProperties.length; j++) {
      if (!objArrProperties.includes(customProperties[j])) break;
    }
    if (!u.doArrsContainSameEls(objArrProperties, customProperties)) continue;
    if (howManyObjs === 1 && !forceArr) return objArr[i];
    matchingObjs.unshift(objArr[i]);
    if (matchingObjs.length === howManyObjs || i === stop) return matchingObjs;
  }
  if (mustReturn) throw new Error(`No object with those properties found in the object array.`);
  if (howManyObjs === 1 && !forceArr) return;
  return matchingObjs;
}
u.areAllElsEqual = arr => arr.every(el => el === arr[0]);
u.doArrsContainSameEls = (...arrs) => {
  for (let i = 0; i < arrs.length; i++) {
    if (!Array.isArray(arrs[i])) throw new TypeError(`u.doArrsContainSameEls expects all arguments to be arrays. `);
    if (arrs[i].length !== arrs[0].length || !u.areArrsEqual(arrs[i].sort(), arrs[0].sort())) return false;
  }
  return true;
}
u.returnValsFromObjs = key => array => Array.from(array.map(obj => obj[key])); // https://gist.github.com/JamieMason/bed71c73576ba8d70a4671ea91b6178e
u.returnValsSetFromObjs = key => array => Array.from(new Set(array.map(obj => obj[key]))); // https://gist.github.com/JamieMason/bed71c73576ba8d70a4671ea91b6178e
u.areArrsEqual = (a, b) => { // https://masteringjs.io/tutorials/fundamentals/compare-arrays#:~:text=Arrays%20are%20objects%20in%20JavaScript,arrays%20are%20the%20same%20reference.
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}
u.returnMsFromSeconds = seconds => {
  if (!u.isNum(seconds)) { throw new TypeError(`u.returnMsFromSeconds expects argument to be a number. Argument: ${seconds}`) } else return seconds * 1000;
}
u.rtnRandInt = (lowerRange, upperRange) => {
  if (!u.isNum(lowerRange) || !u.isNum(upperRange)) throw new TypeError('u.rtnRandInt expects both arguments to be numbers.');
  const difference = (Math.floor(upperRange) + 1) - Math.ceil(lowerRange);
  const randNum = (Math.random() * difference) + Math.ceil(lowerRange);
  return Math.floor(randNum);
}
u.roundToDecimalPlaces = (num, places) => {
  const x = places * Math.pow(10, ((places * -1) - 3));
  const y = Math.pow(10, places);
  return Math.round((num + x) * y) / y;
}
u.parseBool = string => string === 'true' ? true : false;
u.howManyDecPlcs = float => {
  for (let decPlcs = 0; ; decPlcs++) {
    if (!Number.isInteger(float * (10 ** decPlcs))) continue;
    return decPlcs;
  }
}
u.rtnBrowser = () => {
  let browser;
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
    browser = `Opera`;
  }
  else if (navigator.userAgent.indexOf("Chrome") != -1 ) {
    browser = `Chrome`;
  }
  else if (navigator.userAgent.indexOf("Safari") != -1) {
    browser = `Safari`;
  }
  else if (navigator.userAgent.indexOf("Firefox") != -1 ) {
    browser = `Firefox`;
  }
  else if ((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) /* IF IE > 10 */ {
    browser = `IE`;
  } else browser = `unknown`;
  return browser;
}
u.modPrb = (ents, ent, prbFtr) => { // deprecated?
  const prbScrSum = u.rtnPrbScrSumOld(ents);
  const prbScrSumMod = prbScrSum / prbFtr;
  const lfrPrbScr = prbScrSumMod - ent.prbScr;
  for (const otherEnt in ents) {
    if (ents[otherEnt] === ent) continue;
    const otherEntWgt = ents[otherEnt].prbScr / (prbScrSum - ent.prbScr);
    const otherEntPrbScrMod = lfrPrbScr * otherEntWgt;
    ents[otherEnt].prbScr = otherEntPrbScrMod;
  }
}
u.popSelectFieldFrmObj = (selectField, obj) => {
  $.each(obj, function(i) {
    $(selectField).append($('<option>', { 
      value: i,
      text: i, 
    }));
  });
}
u.scrollBottom = div => div.scrollTop = div.scrollHeight - div.clientHeight;
// u.rtnObjDeepCopy = obj => JSON.parse(JSON.stringify(obj));
u.rtnObjDeepCopy = obj => {
  const JSONstring = JSON.stringify(obj);
  const JSONparse = JSON.parse(JSONstring);
  return JSONparse;
}
u.sumArr = arr => {
  const reducer = (prevVal, currentVal) => prevVal + currentVal;
  const sum = arr.reduce(reducer);
  return sum;
}
u.rtnLargestValueInArr = arr => Math.max.apply(Math, arr);
u.capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
u.rtnPctStrFrmPctDec = pctDec => {
  const pctFloat = pctDec * 100;
  const pctFloatRound = u.roundToDecimalPlaces(pctFloat, 4);
  const pct = `${pctFloatRound}%`;
  return pct;
}
u.isEven = num => {
  if (!u.isNum(num)) throw new Error (`u.isEven expects a number. num: ${num}`);
  return num === 0 || Number.isInteger(num / 2);
}
u.rtnChildObjFrmParentObjAndStr = (parentObj, str) => {
  for (const prop in parentObj) {
    if (prop !== str) continue;
    return parentObj[prop];
  }
}
u.hasDuplicates = arr => (new Set(arr)).size !== arr.length;

module.exports = u;


// notes: