const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Load configurations from the config file
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const maxAllowedChars = config.maxAllowedChars;
const inputFolder = config.inputFolder || '';  // Default to root if not defined or empty
const outputHtmlFile = config.outputHtmlFile || 'results.html';  // Default to 'results.html' if not defined
const deleteRegexList = config.deleteRegexList || [];  // Default to an empty list if not defined

// Resolve file paths
const pretextFile = path.join(__dirname, inputFolder, config.pretextFile);
const pretextByPartNumberFile = path.join(__dirname, inputFolder, config.pretextByPartNumberFile);
const longTextFile = path.join(__dirname, inputFolder, config.longTextFile);

// Load the pretext and pretextByPartNumber from their respective files
const pretext = fs.readFileSync(pretextFile, 'utf8');
const pretextByPartNumber = fs.readFileSync(pretextByPartNumberFile, 'utf8');

// Load the long text from the input file
let longText = fs.readFileSync(longTextFile, 'utf8');

// Process the long text by deleting occurrences of regular expressions
deleteRegexList.forEach(regexStr => {
    const regex = new RegExp(regexStr, 'g');
    longText = longText.replace(regex, '');
});

// Ensure the results folder exists in the same directory as the output HTML file
const outputDir = path.dirname(path.join(__dirname, outputHtmlFile));
const resultsDir = path.join(outputDir, 'results');
if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
} else {
    // Delete all previously generated files in the results folder
    fs.readdirSync(resultsDir).forEach(file => {
        fs.unlinkSync(path.join(resultsDir, file));
    });
}

// Split the text
const splitText = require('./splitTextFunction');
const result = splitText(longText, maxAllowedChars, pretext, pretextByPartNumber);

// Write each part to a separate file in the results folder and collect their sizes
const generateResults = require('./generateResults');
const partFilesInfo = generateResults(result, resultsDir);

// Generate the results.html file by calling the generateHTML function
const generateHTML = require('./generateHTML');
generateHTML(longText.length, partFilesInfo, path.join(outputDir, 'results'), path.join(__dirname, outputHtmlFile));

// Open results.html in the default web browser
exec(`start ${path.join(__dirname, outputHtmlFile)}`, (err) => {
    if (err) {
        console.error('Failed to open results.html in the browser', err);
    }
});

console.log('Results written to the results folder and results.html generated');
