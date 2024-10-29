const fs = require("fs");

function fileExists(filename) {
  return fs.existsSync(filename);
}

function validNumber(value) {
  return typeof value === 'number' && isNaN(value);
}

function dataDimensions(dataframe) {
  let rows = -1;
  let columns = -1;
  if (dataframe == null) {
    return [rows,columns];
  }

  if (Array.isArray(dataframe)) {
    rows = dataframe.length;
    if (rows > 0 && typeof dataframe[0] == 'object') {
        cols = Object.keys(dataframe).length;
    }
  } else if (typeof dataframe === 'object') {
    rows = 1;
    cols = Object.keys(dataframe).length;
  }
return [rows, cols];
}

function findTotal(dataset) {
  let totalSum = 0

  for (const row of dataset) {
    for (const value of row) {
      if (typeof value === 'number' && isFinite(value)) {
        totalSum += value;
      }
    }
  }
  return totalSum;
}

function calculateMean(dataset) {
 
};


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