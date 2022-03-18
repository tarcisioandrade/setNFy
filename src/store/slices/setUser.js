import createAsyncSlice from "../helper/createAsyncSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { API_USER_LOGIN, API_USER_TOKEN } from "../../API";

// SLICES
const setLogin = createAsyncSlice({
  name: "setUser",
  reducers: {
    removeUser(state) {
      state.data = null;
    },
  },
  fetchConfig: (user) => API_USER_LOGIN(user),

  asyncToken: (token) => API_USER_TOKEN(token),
});

const fetchUser = setLogin.asyncAction;
const setLoginToken = setLogin.asyncToken;

const { removeUser } = setLogin.actions;

const setSignup = createAsyncSlice({
  name: "setSignup",
  fetchConfig: (user) => ({
    url: "https://setnfy-api.herokuapp.com/user/register",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  }),
});
const fetchRegister = setSignup.asyncAction;

// METODOS

// CADASTRO DO USUARIO
export const signup = (user) => async (dispatch) => {
  await dispatch(fetchRegister(user));
};

// LOGIN DO USUARIO
export const login = (user) => async (dispatch) => {
  const { payload } = await dispatch(fetchUser(user));
  window.localStorage.setItem("id_user", payload.id_user);
  window.localStorage.setItem("token", payload.token);
  window.localStorage.setItem("username", payload.username);
};

// DESLOGA O USUARIO
export const logout = () => (dispatch) => {
  dispatch(removeUser());
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("id_user");
  window.localStorage.removeItem("username");
};

// LOGIN AUTOMATICO DO USUARIO
export const autoLogin = () => async (dispatch, getState) => {
  const token = window.localStorage.getItem("token");
  // const { token } = state.setUser.login.data;
  if (token) await dispatch(setLoginToken(token));
};

const reducer = combineReducers({
  login: setLogin.reducer,
  register: setSignup.reducer,
});

export default reducer;
