<template>
  <div class="hello" >
   <nav class="navbar py-4 fixed-top navbar-expand-lg navbar-dark">
     <div class="container">
        <router-link class="navbar-brand" to="/">Game<span style="color: #C82333">Station</span></router-link>
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
          
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input style="width: 60%" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <router-link style="color: white" to="/login"><a class="btn nav-item mx-1 btn-outline-dark my-2 my-sm-0">Log in</a></router-link>
            <a class="btn btn-outline-danger border-0 mx-2 my-2 my-sm-0" data-toggle="modal" data-target="#miniCart">
              <i class="fas fa-cart-plus"></i>
            </a>
          </form>
        </div>

     </div>

</nav>
    
  </div>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    msg: String
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

</style>
