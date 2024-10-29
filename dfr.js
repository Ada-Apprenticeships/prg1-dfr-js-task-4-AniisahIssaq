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
 
  if (!Array.isArray(dataset) || dataset.length === 0) {
      return 0;
  }

  let total = 0;
  let count = 0;

  const is2DArray = dataset.every(Array.isArray);

  if (is2DArray) {
    for (const row of dataset) {
      for (const value of row) {
        if (typeof value === 'number' && isFinite(value)) {
          total += value;
            count++;
            } else if (typeof value === 'string' && !isNaN(value)) {
                const numValue = parseFloat(value);
                  if (isFinite(numValue)) {
                    total += numValue;
                    count++;
                  }
              }
          }
      }
  } else {
      for (const value of dataset) {
        if (typeof value === 'number' && isFinite(value)) {
          total += value;
            count++;
          } else if (typeof value === 'string' && !isNaN(value)) {
              const numValue = parseFloat(value);
              if (isFinite(numValue)) {
                total += numValue;
                count++;
              }
          }
      }
  }

  return count > 0 ? total / count : 0;
};


function calculateMedian(dataset) {
 const validNumbers = dataset
  .map(Number)
  .filter(num => typeof num === 'number' && !isNaN(num)); 

  if (validNumbers.length === 0) {
    return 0;
  }
  validNumbers.sort((a, b) => a - b);

  const midIndex = Math.floor(validNumbers.length / 2);

  return validNumbers.length % 2 === 0 ? (validNumbers[midIndex - 1] + validNumbers[midIndex]) / 2 : validNumbers[midIndex];

}

function convertToNumber(dataframe, col) {
  let count = 0;

  for (let row of dataframe) {
    if (row.length > col && typeof row[col] === 'string') {
      const convertedValue = Number(row[col]);

      if (!isNaN(convertedValue)) {
        row[col] = convertedValue;
        count++;
      }
    }
  }
  return count;
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