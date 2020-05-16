<template>
  <div class="checkout">
    <Navbar/>
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-md-4">
          <h2 class="pb-3">Checkout</h2>
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
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <h4>Total Price: </h4>
          <h6>&#8358;{{ this.$store.state.total }}</h6>
          <br><br><br>
         <h6>Details</h6>
         <h6>Name: {{ profile.name }}</h6>
         <h6>Email: {{ mail }}</h6>
         <h6>Address: {{ profile.address }}</h6>
         <h6>Phone: {{ profile.phone }}</h6>
         <h6>Postal Code: {{ profile.postCode }}</h6>
         <button @click="order" class="btn btn-outline-danger">Order</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from '../firebase'
import Swal from 'sweetalert2'
import { Toast } from '../main'
export default {
    name: "checkout",

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
            mail: null,
            id: null,
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
      return {
        profile: db.collection('profiles').doc(user.uid),
      }
    },
    methods: {
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
            this.$store.commit('calculateTotal')
        },
        decreaseQuantity (index) {
            if (this.$store.state.cart[index].productQuantity > 1)
            this.$store.state.cart[index].productQuantity--
            this.updateCart()
            this.$store.commit('calculateTotal')
        },
        updateCart () {
            this.$firestore.profile.update({cart: this.$store.state.cart});
            // this.$firestore.profile.update({cart: this.$store.state.cart});
            // window.localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
            this.$store.commit('calculateTotal')
        },
        order () {
            if (this.profile.phone && this.profile.address)
            db.collection("orders").add({
                orderby: this.profile.name,
                email: this.mail,
                orderedItems: this.$store.state.cart,
                phone: this.profile.phone
            })
            .then(() => {
                    db.collection("profiles").doc(this.id).update({
                        cart: []
                    })
                    .then(() => {
                        this.$firestore.profile.update({orders: this.$store.state.cart});
                        this.$store.state.cart = [];
                        this.$router.replace({name: 'orders'})
                    })
                    .catch(function(error) {
                        console.error("Error updating document: ", error);
                    });
            })
            .catch((error) =>  {
                console.error("Error writing document: ", error);
            });
            else this.$router.replace({name: 'profile'})
        }
    },
    created () {
    const user = fb.auth().currentUser;
    this.mail = user.email
    this.id = user.uid
    db.collection('profiles').doc(user.uid).get()
      .then(snapshot => {
        this.$store.state.cart = snapshot.data().cart
        let arr = [];
        if (this.$store.state.cart.length > 0)
        for (let i = 0; i < this.$store.state.cart.length; i++) {
            this.$store.state.cart[i].total = this.$store.state.cart[i].productQuantity * this.$store.state.cart[i].productPrice;
            arr.push(this.$store.state.cart[i].total)
        }
        if (this.$store.state.cart.length > 0)
        this.$store.state.total = arr.reduce((x, y) => x + y)
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
