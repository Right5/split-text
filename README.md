# Split Text Utility

## Description
A utility script to split large text files into smaller parts with customizable pretexts and handling specified deletion patterns.

## Features
- Split large text files into smaller parts.
- Customize pretext for each part.
- Delete specified patterns using regular expressions.
- Generate HTML with copy-to-clipboard functionality for each part.
- Configurable input and output paths.

## Configuration
Create a `config.json` file in the root directory with the following structure:

```json
{
    "maxAllowedChars": 399000,
    "pretextFile": "pretext.txt",
    "pretextByPartNumberFile": "pretextByPartNumber.txt",
    "longTextFile": "longText.txt",
    "inputFolder": "input",  // Set this to the desired input folder or leave it empty for the root folder
    "outputHtmlFile": "output/results.html",  // Set this to the desired output HTML file path and name
    "deleteRegexList": [  // List of regular expressions for deleting text
        "\\(\\d{2}:\\d{2}:\\d{2}\\)"  // Example: delete timestamps in the format (HH:MM:SS)
    ]
}
```

## Input Files
Place the following files in the input folder specified in config.json:

- pretext.txt: Contains the pretext to prepend to each part.
- pretextByPartNumber.txt: Contains the pretext template for each part number.
- longText.txt: Contains the long text to be split.

## Running the Script
1. Ensure you have Node.js installed.
2. Place the config.json and input files in the appropriate folders.
3. Run the script using Node.js:
```
node splitText.js
```
## Output
- The script will create a results folder in the same directory as the outputHtmlFile.
- The results folder will contain the split parts.
- An HTML file (results.html) will be generated with buttons to copy each part to the clipboard.

## Example

### Example config.json
```
{
"maxAllowedChars": 1000,
"pretextFile": "pretext.txt",
"pretextByPartNumberFile": "pretextByPartNumber.txt",
"longTextFile": "longText.txt",
"inputFolder": "input",
"outputHtmlFile": "output/results.html",
"deleteRegexList": [
"\\(\\d{2}:\\d{2}:\\d{2}\\)"
]
}
```

### Example pretext.txt
```
This is the pretext for each part.
```

### Example pretextByPartNumber.txt
```
Part {part}:
```

### Example longText.txt
```
This is a long text that will be split into multiple parts.
```

## License
This project is licensed under the MIT License.
