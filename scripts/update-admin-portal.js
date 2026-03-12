const fs = require('fs');
const path = require('path');

// Load central config
const configPath = path.join(__dirname, '../config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const activeEnv = config.active;
const apiUrl = config[activeEnv].backend.apiUrl;

// Read admin portal HTML
const adminPortalPath = path.join(__dirname, '../backend/admin-portal.html');
let html = fs.readFileSync(adminPortalPath, 'utf8');

// Replace API_URL
html = html.replace(
  /const API_URL = ['"].*?['"]/,
  `const API_URL = '${apiUrl}'`
);

// Write back
fs.writeFileSync(adminPortalPath, html, 'utf8');

console.log(`✓ Admin portal updated to use: ${apiUrl}`);
console.log(`✓ Active environment: ${activeEnv}`);
