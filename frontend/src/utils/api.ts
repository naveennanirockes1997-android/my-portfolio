export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const getApiUrl = (endpoint: string) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // If we have a base URL, prepend it. 
  // If not, relative paths work when proxied in dev or if hosted on the same domain in prod.
  // For Render static sites separate from web services, VITE_API_URL MUST be defined.
  return `${API_BASE_URL}${cleanEndpoint}`;
};
