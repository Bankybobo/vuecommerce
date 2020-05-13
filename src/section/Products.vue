<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-1">Our <span style="color: #DC3545">Products</span> </h1>
          <div class="row text-center">
              
              <div class="col-md-4">
                  <div class="card inline product-item">
                    <img src="../assets/images/about1.jpg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">FIFA 20</h5>
                            <p class="card-text">
                                Showcase your footballing skills when you controll world class players on your console
                            </p>
                            <a href="#" class="btn btn-danger">Add to Cart</a>
                        </div>
                    </div>
              </div>

              <div class="col-md-4">
                  <div class="card product-item inline">
                    <img src="../assets/images/about2.jpg" class="card-img-top img-fluid" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">God of War</h5>
                            <p class="card-text">
                               Enjoy the adventures of a mighty Amazonian warrior battling demons on his way to glory
                            </p>
                            <a href="#" class="btn btn-danger">Add to Cart</a>
                        </div>
                    </div>
              </div>

              <div class="col-md-4">
                  <div class="card product-item inline">
                    <img src="../assets/images/about3.jpeg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Need for Speed</h5>
                            <p class="card-text">
                                Evade the police, enjoy the euphoria as you speed through the paved streets of America
                            </p>
                            <a href="#" class="btn btn-danger">Add to Cart</a>
                        </div>
                    </div>
              </div>
          </div>
      </div>
    
  </div>
</template>

<script>
export default {
  name: "Products",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 3rem;
        // background: #f2f2f2;
        padding-bottom: 3rem;
    }
    .product-item {
        background-color: black;
        box-shadow: 0px 1px 2px;
        margin-top: 20px auto;
        width: 300px;

        // border: 1px solid white;
    }
    .inline {
    overflow: hidden;
    }

    .inline img {
        transition: all 1.0s ease
    }

    .inline:hover img {
        transform: scale(1.3)
    }
    @media (max-width: 760px) { 
    
    .product-item {
      max-width: 250px;
      margin: 10px auto;
    //   margin-left: 40px;
    }

   }
</style>
