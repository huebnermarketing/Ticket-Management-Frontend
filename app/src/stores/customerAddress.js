import { defineStore } from "pinia"

export const useCustomerAddressStore = defineStore({
  id: "customerAddress",
  state: () => ({
    newAddress:[],
  }),
  getters: {
    getnewAddress: (state) => {return state.newAddress}
  },
  actions: {
    setAddress(item){
        this.newAddress.push(item)
    },
  }
})
