<template>
    <div class="">
        <div class=" hero container-fluid h-100 bg-for-hero">
          <div class="row h-100 ">
            <div class="col-md-3">
              
            </div>
            <div class="col-md-3">
              <div class="hero-content">
                <h3 class="hero-title">
                  Video Games for Sony's Playstation 4 and Microsoft's X-box One
                </h3>
                <p class="light-bg">
                  Get games such as FIFA 20, PES 2020, God of War, Call of Duty (Modern Warfare), Drive, Need for Speed, Grand Theft Auto, Mortal Combat and lots more
                </p>
                <div class="hero-btn mt-5">
                    <button class="btn btn-outline-danger mr-4">Explore</button>
                    <button class="btn btn-danger ">Products</button>
                </div>
              </div>
            </div>
            <div class="col-md-3 mt-5">
                
            </div>
            <div class="col-md-3">
              
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
    background:url('../assets/images/controller2.jpg');
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

</style>
