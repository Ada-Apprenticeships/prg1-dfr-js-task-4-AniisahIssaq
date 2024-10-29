const fs = require("fs");

function fileExists(filename) {
  return fs.existsSync(filename);
}

function validNumber(value) {
  return typeof value === 'number' && isNaN(value);
}

function dataDimensions(dataframe) {

}

function findTotal(dataset) {
  
}

function calculateMean(dataset) {
  
}

function calculateMedian(dataset) {

}

function convertToNumber(dataframe, col) {

}

function flatten(dataframe) {

}

function loadCSV(csvFile, ignoreRows, ignoreCols) {

}


function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {

}

module.exports = {
  fileExists,
  validNumber,
  dataDimensions,
  calculateMean,
  findTotal,
  convertToNumber,
  flatten,
  loadCSV,
  calculateMedian,
  createSlice,
};