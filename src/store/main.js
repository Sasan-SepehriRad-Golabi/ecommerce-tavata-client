import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    dwr: false,
    wd: false,
    mol: false,
    mpv: 30,
    mps: false,
    aph: 110,
    gtlis: false,
    sn: {
      sn: true,
      isLogin: false
    },
    al: {
      alC: "",
      alT: "",
      alt: "jhg jug dh"
    },
    u: {
      uln: false,
      gc: "",
      upn: "",
      upln: "",
      upi: "",
      uc: false,
      mr: 0,
      mu: 0,
      rep: 0,
      bup: 0
    }
  }),
  getters: {
    getDrawer() {
      return this.dwr;
    }
  },
  actions: {
    changeDrawer() {
      this.dwr = !this.dwr;
    }
  }
})
