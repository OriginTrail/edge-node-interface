import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
    authEnabled: true,
  },
  mutations: {
    setAuthEnabled(state, enabled) {
      state.authEnabled = enabled;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setAuthEnabled({ commit }, enabled) {
      commit("setAuthEnabled", enabled);
    },
    login({ commit }, user) {
      // Logic to log in the user
      commit("setUser", user);
    },
    logout({ commit }) {
      // Logic to log out the user
      commit("setUser", null);
    },
  },
  getters: {
    isAuthEnabled(state) {
      return state.authEnabled;
    },
    isAuthenticated(state) {
      return !!state.user;
    },
    getUser(state) {
      return state.user;
    },
  },
});

export default store;
