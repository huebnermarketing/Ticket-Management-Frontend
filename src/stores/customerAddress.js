import { defineStore } from "pinia"

export const useCustomerAddressStore = defineStore({
  id: "customerAddress",
  state: () => ({
    newAddress: [],
    updateAddress: [],
    userDetail:null,
    company_logo: '',
    company_name: '',
    UserProfile: '',
    favicon : ''
  }),
  getters: {
    getnewAddress: (state) => { return state.newAddress },
    getupdateAddress: (state) => { return state.updateAddress },
    getuserDetail: (state) => { return state.userDetail },
    getCompanyName: (state) => { return state.company_name },
    getCompanyLogo: (state) => { return state.company_logo },
    getUserProfile: (state) => { return state.UserProfile },
    getFavicon: (state) => { return state.favicon }
  },
  actions: {
    setAddress(item) {
      this.newAddress.push(item)
    },
    setUpdateAddress(item) {
      this.updateAddress.push(item)
    },
    setUserDetail(item) {
      this.updateAddress = item
    },
    setCompanyLogo(item) {
      this.company_logo = item
    },
    setCompanyName(item) {
      this.company_name= item
    },
    setUserProfile(item) {
      this.UserProfile = item
    },
    setFavicon(item) {
      this.favicon = item
    }
  }
})
