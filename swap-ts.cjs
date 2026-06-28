const fs = require('fs');

const path = './src/data.ts';
let content = fs.readFileSync(path, 'utf8');

// I'll grab index 0 contents
// and index 2 contents, and swap them. But wait, what if I just change their order in YATRA_PACKAGES array?
// I can do a simple hack: I find `id: "adi-kailash-haldwani"` block up to `imageUrl: ... },`
// I find `id: "adi-kailash-short"` block up to `imageUrl: ... },`

const p1Start = content.indexOf('  {\n    id: "adi-kailash-haldwani",');
let p1End = content.indexOf('  },\n  {\n    id: "adi-kailash-tanakpur"');

const p3Start = content.indexOf('  {\n    id: "adi-kailash-short",');
let p3End = content.indexOf('  },\n  {\n    id: "chardham-yatra-8n"');

if (p1Start !== -1 && p1End !== -1 && p3Start !== -1 && p3End !== -1) {
  const p1Content = content.substring(p1Start, p1End);
  const p3Content = content.substring(p3Start, p3End);
  
  // Create final replacements
  content = content.replace(p1Content, "%%PLACEHOLDER%%");
  content = content.replace(p3Content, p1Content);
  content = content.replace("%%PLACEHOLDER%%", p3Content);
  
  fs.writeFileSync(path, content, 'utf8');
  console.log("Swapped in src/data.ts!");
} else {
  console.log("Could not find substrings", {p1Start, p1End, p3Start, p3End});
}
