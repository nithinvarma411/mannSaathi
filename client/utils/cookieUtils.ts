// utils/cookieUtils.ts

// Helper functions to work with cookies in the frontend
export const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') {
    // If we're in a server environment (Node.js), return undefined
    return undefined;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

export const setCookie = (name: string, value: string, days?: number): void => {
  if (typeof document === 'undefined') {
    // If we're in a server environment (Node.js), do nothing
    return;
  }

  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/; SameSite=Lax`;
};

export const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') {
    // If we're in a server environment (Node.js), do nothing
    return;
  }

  document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Lax`;
};