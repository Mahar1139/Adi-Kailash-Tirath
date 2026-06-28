const fs = require('fs');

const dataPath = './src/data.ts';
let content = fs.readFileSync(dataPath, 'utf8');

// The elements inside YATRA_PACKAGES are objects.
// Wait, doing this via regex or file replacement in TS is hard.
console.log("I won't use string manipulation on TS file. I'll just rely on site-data.json.");
