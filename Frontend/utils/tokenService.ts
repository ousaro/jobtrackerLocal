export const decodeToken = (token: string) => {
  try {
    // Split the token into its parts
    const base64Url = token.split('.')[1];
    // Replace URL-safe characters and add padding if needed
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getTokenClaims = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return decodeToken(token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};
