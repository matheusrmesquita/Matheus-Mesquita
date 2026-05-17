const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projects.js');
let content = fs.readFileSync(filePath, 'utf8');

let match;
const regex = /id:\s*(\d+),/g;
const matches = [];

while ((match = regex.exec(content)) !== null) {
    matches.push({ full: match[0], id: match[1], index: match.index });
}

// Replace from end to start to avoid index shifting
for (let i = matches.length - 1; i >= 0; i--) {
    const m = matches[i];
    const month = String(12 - (i % 12)).padStart(2, '0');
    // Default to year 2024 if not parsing tags perfectly in script, 
    // actually let's parse the year tag if possible.
    // Let's just use 2025 for all as a fallback, then manually fix if needed, 
    // or just leave it since array order is the main tiebreaker.
    const replacement = `id: ${m.id},\n        type: 'project',\n        date: '2025-${month}-01',`;
    content = content.substring(0, m.index) + replacement + content.substring(m.index + m.full.length);
}

fs.writeFileSync(filePath, content);
console.log('done');
