import { defineStore } from "pinia"

export const useCustomerAddressStore = defineStore({
  id: "customerAddress",
  state: () => ({
    newAddress:[],
    updateAddress:[],
  }),
  getters: {
    getnewAddress: (state) => {return state.newAddress},
    getupdateAddress: (state) => {return state.updateAddress}
  },
  actions: {
    setAddress(item){
        this.newAddress.push(item)
    },
    setUpdateAddress(item){
      this.updateAddress.push(item)
  },
  }
})
