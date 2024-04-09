const crypto = require('crypto');

// Method to generate a random key
function generateKey() {
    return crypto.randomBytes(32).toString('base64'); // 32 bytes for AES-256
}

module.exports = {
    generateKey
}
