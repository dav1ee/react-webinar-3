import { config } from './config';

async function get(endpoint, options = {}) {
  const response = await fetch(config.api.baseUrl + endpoint, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export const api = { get };
