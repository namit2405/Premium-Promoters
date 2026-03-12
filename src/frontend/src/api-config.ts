// API Configuration
// Import from central config
import config from '../../../config.json';

const activeEnv = config.active as 'development' | 'production';
export const API_BASE_URL = config[activeEnv].backend.apiUrl;
