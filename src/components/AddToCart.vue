<template>
    <div class="hello">
         <button @click="addToCart(index)" class="btn-outline-danger btn">Add To cart</button>
         <div class="modal fade" id="minicart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content modal-con">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Items in my cart</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <ul>
                        <li v-for="(p, index) in this.$store.state.cart" :key="index" >
                            <div class="d-flex ">
                                <div class="left">
                                    <img :src="p.productImage" alt="" class="minimize img-fluid">
                                </div>
                                <div class="middle">
                                    <div>{{ p.productName }}</div>
                                    <div>&#8358;{{ p.productPrice * p.productQuantity}}</div>
                                    <div>Quantity: {{ p.productQuantity }}</div>
                                    <div class="d-flex">
                                        <span @click="increaseQuantity(index)" class="mr-3"><i class="fa fa-plus"></i></span>
                                        <span @click="decreaseQuantity(index)"> <i class="fa fa-minus"></i></span>
                                    </div>
                                </div>
                                <div class="right" @click="deleteFromCart(index)"><i class=" delete fa fa-close"></i></div>
                            </div>
                            <hr >
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue Shopping</button>
                    <button @click="checkOut" type="button" class="btn btn-primary">Checkout</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { fb, db } from '../firebase'
import $ from 'jquery'
import Swal from 'sweetalert2'
import { Toast } from '../main'
export default {
    name: "add-to-cart",
    props: {
        name: String,
        price: String,
        productId: String,
        image: String,
        index: Number
    },
    data () {
        return {
            profile: [],
            item: {
                productName: this.name,
                productPrice: parseFloat(this.price),
                productID: this.productId,
                productImage: this.image,
                productQuantity: 1,
                itemIndex: this.index
            }
        }
    },
    firestore(){
      const user = fb.auth().currentUser;
      if (user)
      return {
        profile: db.collection('profiles').doc(user.uid),
      }
    },
    methods: {
        addToCart (index) {
            const user = fb.auth().currentUser;
            if (user == null)
            this.$router.replace({name: 'register'})
            this.item.itemIndex = index
            this.$store.commit('addToCart', this.item)
            this.updateCart()
            $('#minicart').modal("show")
            // store.commit will accept two parameters. First one is the name of
            // the method you want to mutate in the store (addToCart). 
            // Second parameter is the object or variable you want to send to the 
            // addToCart method that you will be mutating in the store.
        },
        deleteFromCart (index) {
            
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
              this.$store.state.cart.splice(index, 1)
              this.updateCart()          
              Toast.fire({
                icon: 'success',
                title: 'Deleted successfully'
              })
            }
          })
        },
        increaseQuantity (index) {
            this.$store.state.cart[index].productQuantity++
            this.updateCart()
        },
        decreaseQuantity (index) {
            if (this.$store.state.cart[index].productQuantity > 1)
            this.$store.state.cart[index].productQuantity--
            this.updateCart()
        },
        checkOut () {
            $('#minicart').modal("hide")
            this.$store.commit('calculateTotal')
            console.log(this.$store.state.total)
            this.$router.replace({name: 'checkout'})
        },
        updateCart () {
            this.$firestore.profile.update({cart: this.$store.state.cart});
            // window.localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
        }
    },
    created () {
    const user = fb.auth().currentUser;
    if (user)
    db.collection('profiles').doc(user.uid).get()
      .then(snapshot => {
        this.$store.state.cart = snapshot.data().cart
      })
    }

}
</script>


<style scoped lang="scss">
button {
    margin: 10px 5px;
    outline: none;
    font-size: 10px;
}

.modal-con {
    background-color: black;
    color: white;
}

.minimize {
    height: 50px;
    width: 50px;
    padding: 5px;
    margin-right: 10px;
}
ul li {
    list-style: none;
}
.delete {
    margin-left: 30px;
    color: red;
}

.left {
    width: 20%;
}
.middle {
    width: 40%;
}
.right {
    width: 20%;
}

</style>
