const crypto = require('crypto');

// Method to generate a random key
function generateKey() {
    return crypto.randomBytes(32); // 32 bytes for AES-256
}

// Method to encrypt data with a key
function encryptData(data, key) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, crypto.randomBytes(16)); // 16 bytes for IV
    let encryptedData = '';
    encryptedData += cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}

// Method to decrypt data with a key
function decryptData(encryptedData, key) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, crypto.randomBytes(16)); // 16 bytes for IV
    let decryptedData = '';
    decryptedData += decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}

// // Example usage
// const originalData = 'Hello, world!';
// const key = generateKey();
// const encryptedData = encryptData(originalData, key);
// const decryptedData = decryptData(encryptedData, key);

// console.log('Original Data:', originalData);
// console.log('Key:', key.toString('hex'));
// console.log('Encrypted Data:', encryptedData);
// console.log('Decrypted Data:', decryptedData);

module.exports = {
    generateKey
}
