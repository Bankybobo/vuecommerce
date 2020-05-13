<template>
<div>
  <div class="products" id="products" v-if="false">
      <div class="container">
          <h1 class="text-center p-5">Our Pro<span style="color: #C82333">ducts List</span> </h1>
          <div class="row">
              
              <div class="col-sm-6 col-md-3" v-for="(product, index) in products" :key="index">

                   <div class="modal fade"  id="description" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content black-bg">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">{{descriptionName}}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <div class="container">
                                  <div class="row">
                                    <div class="col-md-6">
                                      <carousel :perPage="1">
                                        <slide v-for="(image, index) in descriptionImages" :key="index">
                                              <img :src="image" class="card-img-top card-top-height img-fluid no-padding"  alt="..." width="250px">
                                        </slide>
                                      </carousel>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="col-md-12">Price: &#8358;{{ descriptionprice }}</div>
                                        <div style="" v-html="descriptionDes" class="col-md-12 mt-3"></div>
                                    </div>
                                    
                                  </div>
                                </div>
                                
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn-danger btn" data-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                  </div>
                  <div class="card product-item my-5">

                        <carousel :perPage="1">
                          <slide v-for="(image, index) in product.images" :key="index">
                                <img :src="image" class="card-img-top card-top-height img-fluid no-padding"  alt="..." width="250px">
                          </slide>
                        </carousel>
                
                        <div class="card-body body">
                          <div class="justify-content-between d-flex">
                            <h6 class="card-title m-2">{{ product.name }}</h6>
                            <h6 class="card-priceS">&#8358; {{ product.price}}</h6>
                            
                          </div>
                          <div class="row">
                            <div class="col-sm-6 col-md-6"><button class=" btn-dark btn" @click="showDes(product)">Description</button></div>
                            <div class="col-sm-6 col-md-6">
                                <add-to-cart
                                :image="getImage(product.images)"
                                :productId="product.id"
                                :price="product.price"
                                :name="product.name"
                                :description="product.description">
                                </add-to-cart>
                               </div>
                          </div>
                          
                        </div>

                      
                    </div>

                   
              </div>

          </div>
      </div>
<!-- Modal -->
</div>   
  <div>
    <Navbar/>

    <div class="modal fade"  id="description" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content black-bg">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">{{descriptionName}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container">
                <div class="row">
                  <div class="col-md-6">
                    <carousel :perPage="1">
                      <slide v-for="(image, index) in descriptionImages" :key="index">
                        <img :src="image" class="card-img-top card-top-height img-fluid no-padding"  alt="..." width="250px">
                      </slide>
                    </carousel>
                  </div>
                  <div class="col-md-6">
                    <div class="col-md-12">Price: &#8358;{{ descriptionprice }}</div>
                    <div style="font-size: 12px" v-html="descriptionDes" class="col-md-12 mt-3"></div>
                  </div>
                </div>
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn-danger btn" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 py-5 ">
      <div class="container " v-for="product in products" :key="product.id">
      <div class="row shrink">
        <div class="col-md-12 round-border mt-2 p-2 d-flex">
            <div class="left m-1">
              <!-- <img :src="product.images[0]" class="img-fluid mobile-images" alt=""> -->
              <carousel :perPage="1">
                          <slide v-for="(image, index) in product.images" :key="index">
                                <img :src="image" class="card-img-top card-top-height img-fluid no-padding"  alt="..." width="250px">
                          </slide>
              </carousel>
            </div>
            <div class="right">
                  <div style="font-weight:bold" class="pl-3 pt-1">{{product.name.toUpperCase()}}</div>

                  <div class="pl-3">&#8358;{{product.price}}</div>
                  <h6 class="pl-3">Status: Available</h6>

                  <div class="d-flex pl-3">
                    <button class=" btn-outline-light btn" @click="showDes(product)">Details</button>
                    <add-to-cart
                      :image="getImage(product.images)"
                      :productId="product.id"
                      :price="product.price"
                      :name="product.name"
                      :description="product.description">
                    </add-to-cart>
                  </div>

                  <div v-html="product.description" style="font-size: 12px"  class="pl-3">{{ + '...'}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase';
import $ from 'jquery'


export default {
  name: "Productlist",
  props: {
    msg: String
  },

data(){
    return {
        products: [],
        descriptionName: '',
        descriptionprice: '',
        descriptionDes: '',
        descriptionImages: []
     
    }
  },

  methods:{
    showDes (p) {
      // console.log(p.description)
      this.descriptionName = p.name.toUpperCase()
      this.descriptionprice = p.price
      this.descriptionDes = p.description.toUpperCase()
      this.descriptionImages = p.images
      $('#description').modal('show')
    },

    getImage(images){
      return images[0];
      // Since we cannot pass an array as a prop, we need to use a function
    }

  },

  firestore(){
      return {
        products: db.collection('products'),
      }
  },
  created () {
    console.log(this.products)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 2rem;
        background: black;
        padding-bottom: 3rem;
    }
    .product-item {
      background: rgb(22, 22, 22);
      color: #C82333;
      box-shadow: 3px 3px 10px #C82333;
      // height: 400px;
    }
    .card-top-height {
      height: 250px;
      padding: 2px;
    }
    .body {
      padding: 0 10px 10px 10px;
    }
    .no-padding {
      padding: 0;
    }
    p {
      font-size: 10px;
    }
    .black-bg {
      background-color: black;
      color: white;
    }
    button {
      margin: 10px 5px;
      outline: none;
      font-size: 10px;
    }

    .left {
      width: 40%;
    }
    .right {
      width: 60%
    }
    .right h6 {
      font-size: 12px;
    }
    .mobile-images {
      height: 200px;
      width: 200px;
      padding: auto 10px;
    }
    .round-border {
      border: 1px solid rgb(43, 42, 42);
    }
    

  @media (min-width: 760px) { 

    button {
      margin: 10px 5px;
      outline: none;
      font-size: 10px;
    }
    .shrink {
      border: 1px solid rgb(43, 42, 42);
      width: 90%;
      margin: 20px auto;
    }


    .left {
      width: 40%;
    }
    .right {
      width: 60%
    }
    .right h6 {
      font-size: 12px;
    }
    .mobile-images {
      height: 200px;
      width: 200px;
    }
  }

  @media (max-width: 760px) { 
    #description {
      height: 400px;
      width: 400px;
      justify-items: center;
      font-size: 10px;
    }
  }

</style>
