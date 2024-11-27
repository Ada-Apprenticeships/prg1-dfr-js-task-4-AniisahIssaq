const fs = require("fs");

// checks if a file exists using the file system module
function fileExists(filename) {
  return fs.existsSync(filename);
}


// validates if a value is a number or a string that can be parsed into a number
function validNumber(value) {
  if (typeof value === 'number' && !isNaN(value)) {
    return true; // returns true if the value is a valid number
  }
  if (typeof value === 'string') {
    const trimmedValue = value.trim(); // trims whitespace from the string
    const parsedValue = parseFloat(trimmedValue);

    // returns true if the parsed value is a number and matches the trimmed string
    return !isNaN(parsedValue) && parsedValue.toString() === trimmedValue;
  }
  return false; // returns false if the value is not a valid number or parsable string
}


// determines the dimensions of a dataframe (array of arrays)
function dataDimensions(dataframe) {
  let rows = -1;
  let columns = -1;
  
  // returns [-1, -1] if the dataframe is invalid
  if (dataframe === undefined || dataframe === null || dataframe === "") {
    return [-1, -1];
  }
  if (Array.isArray(dataframe)) {
    rows = dataframe.length; // gets the number of rows
    if (rows > 0 && Array.isArray(dataframe[0])) {
      columns = dataframe[0].length; // gets the number of columns if first element is an array
    } else if (rows > 0 && !Array.isArray(dataframe[0])) {
      columns = -1; // sets columns to -1 if not an array
    }
  }
  return [rows, columns]; // returns the dimensions of the dataframe
}


// calculates the total sum of numeric values in a dataset
function findTotal(dataset) {
  let totalSum = 0;

  // returns 0 if the dataset is not an array or is empty
  if (!Array.isArray(dataset) || dataset.length === 0) {
    return 0;
  }
  for (const element of dataset) {
    if (typeof element === 'number' && isFinite(element)) {
      totalSum += element; // adds numeric elements to totalSum
    } else if (typeof element === 'string' && !isNaN(element)) {
      totalSum += parseFloat(element); // parses and add numeric strings to totalSum
    }
  }
  return totalSum; // returns the total sum
}


// calculates the mean (average) of numeric values in a dataset
function calculateMean(dataset) {
  if (!Array.isArray(dataset) || dataset.length === 0) {
    return 0; // returns 0 if the dataset is not an array or is empty
  }

  let total = 0;
  let count = 0;

  for (const element of dataset) {
    if (typeof element === 'number' && isFinite(element)) {
      total += element; // adds numeric elements to total
      count++; // increments the count of valid numbers
    } else if (typeof element === 'string' && !isNaN(element)) {
      const numValue = parseFloat(element);
      if (isFinite(numValue)) {
        total += numValue; // adds parsed numeric strings to total
        count++;
      }
    }
  }
  return count > 0 ? total / count : 0; // returns mean if count > 0, else return 0
}


// calculates the median of numeric values in a dataset
function calculateMedian(dataset) {
  const validNumbers = dataset
    .map(Number) // converts elements to numbers
    .filter(num => typeof num === 'number' && !isNaN(num)); // filters valid numbers

  if (validNumbers.length === 0) {
    return 0; // returns 0 if there are no valid numbers
  }
  validNumbers.sort((a, b) => a - b); // sort numbers in ascending order

  const midIndex = Math.floor(validNumbers.length / 2);

  // returns the median value
  return validNumbers.length % 2 === 0 ? (validNumbers[midIndex - 1] + validNumbers[midIndex]) / 2 : validNumbers[midIndex];
}


// converts elements in a specified column of a dataframe to numbers
function convertToNumber(dataframe, col) {
  let count = 0;

  for (let row of dataframe) {
    if (row.length > col && typeof row[col] === 'string') {
      const convertedValue = Number(row[col]);

      if (!isNaN(convertedValue)) {
        row[col] = convertedValue; // converts and update the value in the dataframe
        count++; // increments count of successfully converted values
      }
    }
  }
  return count; // returns the count of conversions
}


// flattens a dataframe if it consists of single-column arrays
function flatten(dataframe) {
  if (!Array.isArray(dataframe) || dataframe.length === 0 || !Array.isArray(dataframe[0]) || dataframe[0].length !== 1) {
    return []; // returns an empty array if conditions are not met
  }
  return dataframe.map(row => row[0]); // returns flattened array
}


// loads and parses a CSV file, ignoring specified rows and columns
function loadCSV(csvFile, ignoreRows, ignoreCols) {
  try {
    const fileContent = fs.readFileSync(csvFile, 'utf-8');
    const rows = fileContent.split('\n').filter(row => row.trim() !== '');
    const totalRows = rows.length;
    const totalColumns = rows.length > 0 ? rows[0].split(',').length : 0;

    const dataframe = rows
      .map((row, rowIndex) => {
        if (ignoreRows.includes(rowIndex)) {
          return null; // ignores specified rows
        }
        const columns = row.split(',');
        return columns.filter((_, colIndex) => !ignoreCols.includes(colIndex)); // ignores specified columns
      })
      .filter(row => row !== null); // filters out ignored rows

    return [dataframe, totalRows, totalColumns]; // returns the dataframe and its dimensions
  } catch (error) {
    console.error(`Error loading CSV: ${error.message}`);
    return [[], -1, -1]; // returns error message
  }
}


// creates a slice of the dataframe based on a pattern match
function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {
  if (!Array.isArray(dataframe) || !dataframe.length || !Array.isArray(dataframe[0])) {
    return []; // returns empty array if dataframe is invalid
  }
  if (typeof columnIndex !== 'number' || columnIndex < 0 || columnIndex >= dataframe[0].length) {
    return []; // returns empty array if columnIndex is invalid
  }
  if (pattern === undefined) {
    return []; // returns empty array if pattern is undefined
  }

  const result = [];
  const hasWildCard = pattern === '*'; // checks if pattern is a wildcard

  for (let i = 0; i < dataframe.length; i++) {
    const row = dataframe[i];
    const valueToMatch = row[columnIndex];
    if (hasWildCard || valueToMatch === pattern) {
      const rowToAdd = exportColumns.length > 0
        ? exportColumns
            .filter(indexIsValid)
            .map(index => {
              if (index >= 0 && index < row.length) {
                return row[index]; // adds specified columns to result
              }
              return undefined; 
            })
        : row; // adds entire row if no specific columns are specified

      result.push(rowToAdd); // adds matching row to result
    }
  }

  return result; // returns the sliced dataframe
}


// checks if an index is valid (non-negative).
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