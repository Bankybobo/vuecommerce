<template>
  <div id="app">
    <router-view/>
    <!-- <div class="container ">
      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <h5 style="color: #DC3545">&copy; Adedara Bankole 2020</h5>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { fb, db } from './firebase'
export default {
  data () {
    return {
      profile: [],
    }
  },
 created () {
    const user = fb.auth().currentUser;
    if (user)
    db.collection('profiles').doc(user.uid).get()
      .then(snapshot => {
        this.$store.state.cart = snapshot.data().cart
      if (this.$store.state.cart.length > 0){
      let arr = [];
      for (let i = 0; i < this.$store.state.cart.length; i++) {
        this.$store.state.cart[i].total = this.$store.state.cart[i].productQuantity * this.$store.state.cart[i].productPrice;
        arr.push(this.$store.state.cart[i].total)
      }
      this.$store.state.total = arr.reduce((x, y) => x + y)
      }
      })
    }
    

  }
</script>

<style lang="scss">
#app {
  font-family: 'Nunito', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: white;
  background-color: black;
  min-height: 100vh;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
