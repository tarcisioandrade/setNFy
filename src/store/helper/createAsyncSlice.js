import { createSlice } from "@reduxjs/toolkit";

/**
 * Cria um slice com uma função assíncrona
 * @param {Object} config
 * @param {String} config.name
 * @param {Object} config.initialState
 * @param {Object} config.reducers
 * @param {Function} config.fetchConfig
 */

const createAsyncSlice = (config) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      loading: null,
      data: null,
      error: null,
      ...config.initialState,
    },
    reducers: {
      fetchStarted(state) {
        state.loading = true;
      },
      fetchSuccess(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      fetchError(state, action) {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      },
      ...config.reducers,
    },
  });

  const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

  const asyncAction = (payload) => async (dispatch) => {
    try {
      dispatch(fetchStarted());
      const { url, options } = config.fetchConfig(payload);
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (!response.ok) throw new Error(data.message || data.error.message);
      return dispatch(fetchSuccess(data));
    } catch (error) {
      return dispatch(fetchError(error.message || error));
    }
  };

  const asyncAdd = (payload) => async (dispatch) => {
    try {
      dispatch(fetchStarted());
      const { url, options } = config.asyncAdd(payload);
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (data.ok || data) {
        return dispatch(fetchSuccess(data));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return dispatch(fetchError(error.message || true));
    }
  };

  const asyncAtt = (payload) => async (dispatch) => {
    try {
      dispatch(fetchStarted());
      const { url, options } = config.asyncAtt(payload);
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      if (data.ok || data) {
        return dispatch(fetchSuccess(data));
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      return dispatch(fetchError(error.message || true));
    }
  };

  return { ...slice, asyncAction, asyncAdd, asyncAtt };
};

export default createAsyncSlice;
