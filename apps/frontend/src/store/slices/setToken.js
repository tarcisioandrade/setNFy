import { API_USER_TOKEN } from "../../API";
import createAsyncSlice from "../helper/createAsyncSlice";

const slice = createAsyncSlice({
  name: "setToken",
  initialState: {
    token: window.localStorage.getItem("token") || null,
  },
  reducers: {
    removeToken(state) {
      state.data = null;
      state.token = null;
    },
  },
  fetchConfig: (token) => API_USER_TOKEN(token),
});

export const fetchToken = slice.asyncAction;
export const { removeToken, fetchError: fetchErrorToken } = slice.actions;

export default slice.reducer;
