const bcrypt = require("bcrypt");

const password = "admin123";
const saltRounds = 10;

async function testHash() {
    const hash = await bcrypt.hash(password, saltRounds);
    

    const match = await bcrypt.compare(password, hash);
    
}

testHash();
