import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    counter: 0,
    userInfo: { avatar: "", uname: "" },
    // 搜索引擎
    engine: [
      {
        title: "百度",
        value: 0,
      },
      {
        title: "谷歌",
        value: 1,
      },
      {
        title: "必应",
        value: 2,
      },
    ],
    defaultConfig: {
      isWeather: false,
      isSuggestions: false,
      engine: 0,
    },
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    getEngine: (state) => state.engine,
    getDefaultConfig: (state) => state.defaultConfig,
    isLogin: (state) => (state.userInfo.uname ? true : false),
  },
  actions: {
    increment() {
      this.counter++;
    },
    updateStore(data: { avatar: string; uname: string }) {
      this.userInfo = data;
    },
    logoutUser() {
      this.userInfo = {
        avatar: "",
        uname: "",
      };
    },
  },
});
