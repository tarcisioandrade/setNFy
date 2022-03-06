const setLocalStorage = (state) => (next) => (action) => {
  const response = next(action);
  if (action.payload && action.payload.token) {
    const { token, id_user } = action.payload;
    window.localStorage.setItem("token", JSON.stringify(token));
    window.localStorage.setItem("id_user", JSON.stringify(id_user));
  }
  return response;
};
export default setLocalStorage;
