const fs = require('fs');
const path = require('path');

// Load central config
const configPath = path.join(__dirname, '../config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const activeEnv = config.active;
const envConfig = config[activeEnv];

module.exports = {
  API_URL: envConfig.backend.apiUrl,
  BACKEND_URL: envConfig.backend.url,
  FRONTEND_URL: envConfig.frontend.url,
  ENV: activeEnv
};
