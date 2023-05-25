export const baseUrl = 'http://localhost:8000';
export const homeUrl = `${baseUrl}/photos/home`;
export const apiUrl = `${baseUrl}/api/v1`;

export const serverRoute = {
  signIn: `${apiUrl}/users/signin`,
  signout: `${apiUrl}/users/signout`,
  signUp: `${apiUrl}/users/signup`,
  checkSignedIn: `${apiUrl}/users/checkLoggedIn`,
  refreshToken: `${apiUrl}/users/refreshToken`,
  updateMe: `${apiUrl}/users/updateMe`,
  googleCallbackUrl: `${baseUrl}/auth/google`,
};
