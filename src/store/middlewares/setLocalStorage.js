const setLocalStorage = (state) => (next) => (action) => {
  const response = next(action);
  if (action.payload && action.payload.token) {
    const { token, id_user, username } = action.payload;
    window.localStorage.setItem("id_user", JSON.stringify(id_user));
    window.localStorage.setItem("username", JSON.stringify(username));
    window.localStorage.setItem("token", JSON.stringify(token));
  }
  return response;
};
export default setLocalStorage;
