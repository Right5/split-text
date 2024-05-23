const fs = require('fs');
const path = require('path');

function generateResults(result, resultsDir) {
    return result.map((part, index) => {
        const partFileName = path.join(resultsDir, `part${index + 1}.txt`);
        fs.writeFileSync(partFileName, part);
        const fileSize = fs.statSync(partFileName).size;
        return { fileName: `part${index + 1}.txt`, size: fileSize };
    });
}

module.exports = generateResults;
