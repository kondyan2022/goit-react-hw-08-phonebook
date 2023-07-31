export const authHandlePending = state => {
  state.isPending = true;
};

export const authHandleFulfilled = state => {
  state.isPending = false;
};
export const authHandleFulfilledLoggedIn = (state, { payload }) => {
  state.isLoggedIn = true;
  state.user = payload.user;
  state.token = payload.token;
};

export const authHandleFulfilledLoggedOut = state => {
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};

export const authHandleRejected = state => {
  state.isPending = false;
};
export const authHandlePendingRefresh = state => {
  state.isRefreshing = true;
};
export const authHandleRejectedRefresh = state => {
  state.isRefreshing = false;
  state.user = { name: null, email: null };
  state.token = null;
  state.isLoggedIn = false;
};
export const authHandleFulfilledRefresh = (state, { payload }) => {
  state.isRefreshing = false;
  state.isLoggedIn = true;
  state.user = payload;
};
