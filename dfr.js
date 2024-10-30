const fs = require("fs");

function fileExists(filename) {
  return fs.existsSync(filename);
}

function validNumber(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    return true;
  }
  if (typeof value === 'string') {
    const trimmedValue = value.trim();
    const parsedValue = parseFloat(trimmedValue);

    return !isNaN(parsedValue) && parsedValue.toString() === trimmedValue;
  }

return false;

}

function dataDimensions(dataframe) {
  let rows = -1;
  let columns = -1;
  
  if (dataframe === undefined || dataframe === null || dataframe === "") {
    return [-1, -1];
  }
  if (Array.isArray(dataframe)) {
    rows = dataframe.length;
    if (rows > 0 && Array.isArray(dataframe[0])) {
      columns = dataframe[0].length;
      } else if (rows > 0 && !Array.isArray(dataframe[0])) {
        columns = -1
      }
    }
    return [rows, columns];
  }


function findTotal(dataset) {
  let totalSum = 0

  if (!Array.isArray(dataset) || dataset.length === 0) {
    return 0;
  }
  for (const element of dataset) {
      if (typeof element === 'number' && isFinite(element)) {
        totalSum += element;
      } else if (typeof element === 'string' && !isNaN(element)) {
        totalSum += parseFloat(element);
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

  for (const element of dataset) {
    if (typeof element === 'number' && isFinite(element)) {
      total += element;
      count++;
    } else if (typeof element === 'string' && !isNaN(element)) {
      const numValue = parseFloat(element);
        if (isFinite(numValue)) {
          total += numValue;
          count++
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
  if (!Array.isArray(dataframe) || dataframe.length === 0 || !Array.isArray(dataframe[0]) || dataframe[0].length !== 1) {
    return [];
  }
  return dataframe.map(row => row[0]);
}

function loadCSV(csvFile, ignoreRows, ignoreCols) {
  try {
    const fileContent = fs.readFileSync(csvFile, 'utf-8');
    const rows = fileContent.split('\n').filter(row => row.trim() !== '');
    const totalRows = rows.length;
    const totalColumns = rows.length > 0 ? rows[0].split(',').length : 0;

    const dataframe = rows
      .map((row, rowIndex) => {
        if (ignoreRows.includes(rowIndex)) {
          return null;
        }
        const columns = row.split(',')
        return columns.filter((_, colIndex) => !ignoreCols.includes(colIndex));
      })
    .filter(row => row !== null);

  return [dataframe, totalRows, totalColumns];
  } catch (error) {
    console.error(`Error loading CSV: ${error.message}`);
    return [[], -1, -1]; 
  }
  
}


function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {
  if (!Array.isArray(dataframe) || !dataframe.length || !Array.isArray(dataframe[0])) {
    return [];
  }
  if (typeof columnIndex !== 'number' || columnIndex < 0 || columnIndex >= dataframe[0].length) {
    return [];
  }
  if (pattern === undefined) {
    return [];
  }

  const result = [];
  const hasWildCard = pattern === '*';

  for (let i = 0; i < dataframe.length; i++) { 
    const row = dataframe[i];
    const valueToMatch = row[columnIndex];
    if (hasWildCard || valueToMatch === pattern) {
      const rowToAdd = exportColumns.length > 0
        ? exportColumns
            .filter(indexIsValid)
            .map(index => {
              if (index >= 0 && index < row.length) {
                return row[index];
              }
              return undefined; 
            })
        : row; 

      result.push(rowToAdd);
    }
  }

  return result; 
}

function indexIsValid(index) {
  return index >= 0;
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