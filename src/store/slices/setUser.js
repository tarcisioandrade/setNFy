import createAsyncSlice from "../helper/createAsyncSlice";
import { API_USER_LOGIN } from "../../API";
import { fetchToken, removeToken } from "./setToken";

// SLICES
const setLogin = createAsyncSlice({
  name: "setUser",
  reducers: {
    removeUser(state) {
      state.data = null;
    },
  },
  fetchConfig: (user) => API_USER_LOGIN(user),
});

const fetchUser = setLogin.asyncAction;
const { removeUser, fetchError } = setLogin.actions;

// LOGIN DO USUARIO
export const login = (user) => async (dispatch) => {
  const { payload } = await dispatch(fetchUser(user));
  if (payload.token) {
    await dispatch(fetchToken(payload.token));
    window.localStorage.setItem("token", payload.token);
  }
};

// DESLOGA O USUARIO
export const logout = () => (dispatch) => {
  dispatch(removeUser());
  dispatch(removeToken());
  window.localStorage.removeItem("token");
};

// LOGIN AUTOMATICO DO USUARIO
export const autoLogin = () => async (dispatch, getState) => {
  const { setToken } = getState();
  if (setToken?.token) {
    const { type } = await dispatch(fetchToken(setToken?.token));
    if (type === fetchError.type) dispatch(logout());
  }
};

export default setLogin.reducer;
