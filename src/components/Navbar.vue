<template>
  <div class="hello" >
   <nav class="navbar py-4 fixed-top navbar-expand-lg navbar-dark">
     <div class="container">
        <router-link class="navbar-brand" to="/">Game<span style="color: #C82333">Station</span> </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/productlist" class="nav-link" href="#">Products</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/about" class="nav-link" href="#">About</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/orders" class="nav-link" href="#">Orders</router-link>
            </li>

            <li class="nav-item">
              <router-link to="/profile" class="nav-link" href="#">Profile</router-link>
            </li>
          
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <div v-show="!show" class="username mr-3"><i class="fa fa-user text-success"></i> {{ username }}</div>
            
            <router-link v-if="show" style="color: white" to="/login"><a class="btn nav-item mx-1 btn-outline-dark my-2 my-sm-0">Log in</a></router-link>

            <div v-else style="color: white" @click="logOut"><a class="btn nav-item mx-1 btn-outline-dark my-2 my-sm-0">Log Out</a></div>

            <a @click="showCart" class="btn btn-outline-danger border-0 mx-2 my-2 my-sm-0" data-toggle="modal" data-target="#miniCart">
              <i class="fas fa-cart-plus under"></i>
              <span class="over" v-show="cartLength() > 0">{{ cartLength() }}</span>
            </a>
          </form>
        </div>

     </div>

</nav>
    
  </div>
</template>

<script>
import { fb, db } from '../firebase'
import $ from 'jquery'
export default {
  name: "Navbar",
  props: {
    msg: String
  },
  data () {
    return {
      mail: '',
      show: true,
      username: 'user',
    }
  },
  methods: {
      logOut () {
      fb.auth().signOut()
      .then(() => {
      if (this.$route.name !== 'home')
      this.$router.replace({name: 'home'})
      })
      .catch((err) => {
      console.log(err)
      })
    },
    showCart () {
      if (this.$route.name == "home"  || this.$route.name == "orders" || this.$route.name == "profile")
      this.$router.replace({name: 'checkout'})
    $('#minicart').modal('show')
    },
    cartLength () {
      if (this.$store.state.cart.length > 0)
      return this.$store.state.cart.length
      else return ''
    }
  },
  
  created () {
    var user = fb.auth().currentUser;
    if (user) {
      this.mail = user.email;
      this.show = false,
      db.collection('profiles').doc(user.uid).get()
      .then(snapshot => {
        this.username = snapshot.data().name
      })
      }
  },
  components:{}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
    .navbar {
        background: black;
        color: #fff;
        padding: 50px
    }
    .navbar-brand {
      font-weight: bolder;
    }
    .nav-item  {
      color: white;
    }

   
  @media (min-width: 992px) { 
    
    .navbar{
      padding-top:16px;
      padding-bottom:16px;
      background-color: black !important;
      color: white !important;
    }

   }

   @media (max-width: 770px) { 
    
    .navbar{
      width: 100%;
      padding: auto;
    }
   }

   .under { 
     font-size: 25px;
   }
   
   .over {
     background-color: red;
     padding: 5px;
     border-radius: 3px;
     font-weight: bold;
     margin-left: -15px;
     width: 20px;

   }

</style>
