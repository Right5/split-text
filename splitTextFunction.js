function splitText(text, maxAllowedChars, pretext = '', pretextByPartNumber = '') {
    if (!text || typeof text !== 'string' || !maxAllowedChars || typeof maxAllowedChars !== 'number') {
        throw new Error('Invalid input');
    }

    console.log(`Number of characters in the initial text: ${text.length}`);

    let parts = [];
    let startIndex = 0;
    let textLength = text.length;
    let partNumber = 1;

    while (startIndex < textLength) {
        let currentPretext = pretext;
        if (pretextByPartNumber) {
            currentPretext = pretextByPartNumber.replace('{part}', partNumber) + pretext;
        }

        let adjustedMaxChars = maxAllowedChars - currentPretext.length;
        let endIndex = Math.min(startIndex + adjustedMaxChars, textLength);

        if (endIndex === textLength) {
            // If we reach the end of the text
            parts.push(currentPretext + text.substring(startIndex, endIndex));
            break;
        }

        // Find the closest newline before the maxAllowedChars limit
        let newlineIndex = text.lastIndexOf('\n', endIndex);

        if (newlineIndex > startIndex) {
            // If a newline is found within the limit
            endIndex = newlineIndex + 1; // Include the newline character
        } else {
            // If no newline is found, find the closest space to avoid breaking a word
            let spaceIndex = text.lastIndexOf(' ', endIndex);
            if (spaceIndex > startIndex) {
                endIndex = spaceIndex + 1; // Include the space character
            }
        }

        parts.push(currentPretext + text.substring(startIndex, endIndex));
        startIndex = endIndex;
        partNumber++;
    }

    return parts;
}

module.exports = splitText;
