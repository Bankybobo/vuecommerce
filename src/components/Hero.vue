<template>
    <div class="">
        <div class=" hero container h-100 bg-for-hero">
          <div class="row h-100 mt-5">
            <div class="col-md-1">
              
            </div>
            <div class="col-md-4">
              <div class="hero-content">
                <div class="col-md-8">
                  <h3 class="hero-title">
                  Video Games for Sony's Playstation 4 
                </h3>
                <p class="light-bg">
                  FIFA 20 . PES 2020. God of War
                </p>
                <div class="col-md-4"></div>
                </div>
                <div class="hero-btn ml-3 mt-3">
                    <router-link to="/productlist"><button class="btn btn-danger ">Products</button></router-link>
                </div>
              </div>
            </div>
            <div class="col-md-3">
              
            </div>
            <div class="col-md-2 ">
                
            </div>
            <div class="col-md-2">
              
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hero{
    padding-top: 7rem;
    width: 100%;
    text-align: left;
    background:url('../assets/images/controller.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-position: cover;
    min-height: 100vh;
  }
  .hero-content {
    padding-top: 50px;
    font-size: 15px;
  }

  .light-bg {
    background-color: rgb(0, 0, 0, .4);
    padding: 20px 0;
  }
  @media (max-width: 770px) { 
    
   }

</style>
