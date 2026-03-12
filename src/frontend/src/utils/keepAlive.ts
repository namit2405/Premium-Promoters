import { API_BASE_URL } from '../api-config';

// Keep backend alive by pinging every 10 minutes
export function startKeepAlive() {
  const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

  const ping = async () => {
    try {
      await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
      console.log('Backend keep-alive ping sent');
    } catch (error) {
      console.error('Keep-alive ping failed:', error);
    }
  };

  // Initial ping
  ping();

  // Set up interval
  setInterval(ping, PING_INTERVAL);
}
