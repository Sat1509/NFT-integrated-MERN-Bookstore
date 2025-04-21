const fs = require('fs');
const obj = fs.readFileSync('\config\\firebaseServiceAccountKey.json', 'utf8');


// Escape the private key properly
obj.private_key = obj.private_key.replace(/\\n/g, '\n').replace(/\n/g, '\\n');

// Now stringify the whole thing
const jsonStr = JSON.stringify(obj);

console.log(jsonStr);

