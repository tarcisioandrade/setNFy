import createAsyncSlice from "../helper/createAsyncSlice";
import { combineReducers } from "@reduxjs/toolkit";
import getLocalStorage from "../helper/getLocalStorage";

const setLogin = createAsyncSlice({
  name: "setUser",
  initialState: {
    data: {
      id_user: getLocalStorage("id_user", null),
      token: getLocalStorage("token", null),
    },
  },
  reducers: {
    removeUser(state) {
      state.data = null;
    },
  },
  fetchConfig: (user) => ({
    url: "https://setnfy-api.herokuapp.com/user/login",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  }),
});
const fetchUser = setLogin.asyncAction;
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

const setUserToken = createAsyncSlice({
  name: "tokenLogin",
  fetchConfig: (token) => ({
    url: "https://setnfy-api.herokuapp.com/user/token",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  }),
});
const setLoginToken = setUserToken.asyncAction;

// METODOS
export const signup = (user) => async (dispatch) => {
  try {
    await dispatch(fetchRegister(user));
  } catch (error) {}
};

export const login = (user) => async (dispatch) => {
  try {
    await dispatch(fetchUser(user));
  } catch (error) {}
};

export const autoLogin = () => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.setUser.login.data;
  if (token) await dispatch(setLoginToken(token));
};

export const logout = () => (dispatch) => {
  dispatch(removeUser());
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("id_user");
};
const reducer = combineReducers({
  login: setLogin.reducer,
  register: setSignup.reducer,
});

export default reducer;
