<template>
  <div class="products">
      <div class="container">
          
        <div class="intro h-100">
            
            <h3 class="text-center mb-3">Basic Crud</h3>
            <div class="product-test">
 
            </div>

            <h3 class="d-inline-block">Products List</h3>

            <button @click="addNew" class=" btn btn-dark float-right">Add Product</button>

            <div class="table-responsive mt-3">
              <table class="table">
                <thead>
                  <tr>
                    <th>Name </th>
                    <th>Price </th>
                    <th>Modify </th>
                  </tr>
                </thead>

                <tbody v-for="p in products" :key="p['.key']">
                  <tr>
                    <td> {{ p.name }} </td>
                    <td> {{ p.price }} </td>
                    <td>
                      <button @click="editProduct(p)" class="btn btn-dark">Edit</button> 

                      <button @click="deleteProduct(p)" class="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                </tbody>

              </table>
            </div>

          </div>
        </div>
<!-- Modal -->
      <!-- Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="editLabel">{{ modal }} Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

                <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor style="background: black" v-model="product.description"></vue-editor>
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" placeholder="Product tags" v-model="product.tag" class="form-control">
                      
                      <div  class="d-flex">
                        <p>
                            <span class="p-1"></span>
                        </p>

                      </div>
                    </div>


                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                        <div class="img-wrapp"  v-for="(i, index) in product.images" :key="i['.key']">
                          <img style="width: 80px" :src="i" alt="Pic1">
                          <span class="delete-img" @click="deleteImage(i, index)">X</span>
                        </div>
                    </div>

                  </div>
                </div>




            </div>
            <div class="modal-footer">

              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

              <button @click="addProduct()" type="button" v-if="modal == 'Add New'" class="btn btn-primary">Add Product</button>

              <button @click="updateProduct()" v-else  type="button" class="btn btn-primary">Edit Product</button>

            </div>
          </div>
        </div>
      </div>
      </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { fb, db } from '../firebase'
import { Toast } from '../main'
import $ from 'jquery'
import Swal from 'sweetalert2'
// import { firestore } from 'firebase'
export default {
  name: "Products",
  components: {
    VueEditor
  },
  props: {
    msg: String
  },

  data(){
    return {
      products: [],
      product: {
          images: [],
          name: '',
          price: '',
          description: null,
          tag: [],
      },
      modal: null,
      activeID: '',
    }
  },

  firestore () {
      return {
        products: db.collection('products')
      }
  },
  methods:{
      deleteImage (i, index) {
        let image = fb.storage().refFromURL(i)
        // this is to grab the ref of the URL from storage. This is different from when you want to add image.
        this.product.images.splice(index, 1)
        image.delete().then(() => {
          console.log("image deleted")
        }).catch((error) => {
          console.log('An error has occured', error)
        })
      },

      uploadImage(e) {
        if (e.target.files[0]){
        let file = e.target.files[0]
        var storageRef = fb.storage().ref('products/' + file.name)
        let uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', () => {
    
        }, () => {
          // handles error or unsuccessful uploads
        }, () => {
          // handles successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.product.images.push(downloadURL);
              console.log('file available at', this.product.images);
            })
          })
        }
      },

      addNew () {
        this.reset()
        this.modal = "Add New"
        $('#product').modal('show')
      },

      updateProduct () {
          console.log(this.activeID)
          this.$firestore.products.doc(this.activeID).update(this.product)
          Toast.fire({
            icon: 'success',
            title: 'Updated successfully'
          })
        $('#product').modal('hide')
      },

      editProduct (p) {
        this.modal = "Edit"
        $('#product').modal('show')
        this.product = p
        this.activeID = p.id
        // Use the id instead of key. We have defined .key in the main.js
      },

      reset () {
        this.product = {images: [], name: '', price: '',  description: null, tag: [] }
      },

      addProduct () {
        this.$firestore.products.add(this.product)
        $('#product').modal('hide')
      },
      
      deleteProduct (productToDelete) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            background: "black",
          })
          .then((result) => {
            if (result.value) {
              this.$firestore.products.doc(productToDelete.id).delete()          
              Toast.fire({
                icon: 'success',
                title: 'Deleted successfully'
              })
            }
          })      
      },
      
    },

    created () {

    },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img{
  cursor: pointer;
}
.products {
  background-color: black;
}

tr {
  padding: 5px 30px;
  // border: 1px solid white;
  color: white
}
input {
  border: 1px solid rgb(185, 182, 182);
}

th {
  padding: 5px 30px;
  // border: 1px solid white;
  color: black;
  background-color: white;
}
#editLabel, .form-group, .modal {
  color: black;
}


.close-button-class {
  background-color: black;
}



</style>
