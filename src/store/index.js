import Vue from 'vue'
import Vuex from 'vuex'
import { fb, db } from '../firebase'
Vue.use(Vuex)



const store = new Vuex.Store({
  state: {
    cart: [],
    total: null
  },
  mutations: {
    addToCart (state, item) {
      let found = state.cart.find(product => product.productID == item.productID)
      if (found) found.productQuantity++
      else state.cart.push(item)
      this.commit('saveToServer')
      },

      calculateTotal (state) {
        let arr = [];
          for (let i = 0; i < state.cart.length; i++) {
            state.cart[i].total = state.cart[i].productQuantity * state.cart[i].productPrice;
            arr.push(state.cart[i].total)
          }
        state.total = arr.reduce((x, y) => x + y)
        console.log(state.total)
      },

      saveToServer (state) {
        const user = fb.auth().currentUser;
        if(user)
        db.collection("profiles").doc(user.uid).update({
              cart: state.cart
          })
          .then(() => {
              console.log("Document successfully updated!");
          })
          .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
      }

  },
  actions: {
  },
  modules: {
  }
})

export default store
