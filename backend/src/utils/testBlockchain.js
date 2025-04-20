const getBlockchain = require("./getBlockchain");

async function testConnection() {
    try {
        const contract = await getBlockchain();
        if (!contract) {
            console.log("Failed to connect to the blockchain.");
        } else {
            console.log("Blockchain connection successful!");
        }
    } catch (error) {
        console.error("Error connecting to blockchain:", error.message);
    }
}

testConnection();
