<template>
  <div class="home">
    <div>
    <Navbar/>
    </div>
      <Hero/>
      <div class="container h-100" >
        <div class="row pt-4 mt-3 h-100 justify-content-center align-items-center">
          <div class="col-md-6 mb-5">
            <img src="../assets/images/controller2.jpg" class="img-fluid" alt="" width="400">
          </div>
          <div class="col-md-6">
            <h3>Learn More <span style="color: c82333"> About us</span></h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
            </p>
             <button class="btn custom-btn btn-outline-danger mr-4">Browse Products</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import Navbar from "@/components/Navbar.vue";


export default {
  name: "home",
  components: {
    Hero, Navbar
  }
};
</script>

<style lang="scss" scoped>
.home {
  background-color: black;
  color: white;
}
</style>

