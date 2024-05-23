const fs = require('fs');
const path = require('path');

function generateHTML(totalSize, partFilesInfo, resultsDir, outputHtmlPath) {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Results</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { margin: 20px; }
        .button { margin: 5px 0; }
        .alert {
            visibility: hidden;
            min-width: 250px;
            margin-left: -125px;
            background-color: #4CAF50;
            color: white;
            text-align: center;
            border-radius: 2px;
            padding: 16px;
            position: fixed;
            z-index: 1;
            left: 50%;
            bottom: 30px;
            font-size: 17px;
        }
    </style>
    <script>
        function copyToClipboard(content) {
            const textarea = document.createElement('textarea');
            textarea.value = content;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            const alertBox = document.getElementById('alertBox');
            alertBox.style.visibility = 'visible';
            setTimeout(() => {
                alertBox.style.visibility = 'hidden';
            }, 2000);
        }
    </script>
</head>
<body>
    <div class="container">
        <h1>Results</h1>
        <p>Total size of longText: ${totalSize} characters</p>
        ${partFilesInfo.map(({ fileName, size }, index) => `
            <div class="button">
                <button onclick="copyToClipboard(document.getElementById('part${index + 1}').textContent)">
                    Copy Part ${index + 1}
                </button> (${size} bytes)
                <pre id="part${index + 1}" style="display: none">${fs.readFileSync(path.join(resultsDir, fileName), 'utf8')}</pre>
            </div>
        `).join('')}
    </div>
    <div id="alertBox" class="alert">Content copied to clipboard</div>
</body>
</html>
    `;

    fs.writeFileSync(outputHtmlPath, htmlContent);
}

module.exports = generateHTML;
