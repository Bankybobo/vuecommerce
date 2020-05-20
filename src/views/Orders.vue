<template>
  <div class="container">
    <Navbar/>
    <div class="row pt-5 mt-5">
      <div class="col-md-4" v-if="show"><h4>Your order has been completed, a member of our team will contact you.</h4></div>
      <div class="col-md-4" v-else><h4>You have no order yet</h4></div>
      <div class="col-md-4" ></div>
      <div class="col-md-4" ></div>
      
      <div class="col-md-6" v-show="show">
        <ul>
          <li class="my-4" v-for="(p, y) in order" :key="y">
            <div>Name: {{p.productName}}</div>
            <div>Price: {{p.productPrice}}</div>
            <div>Quantity: {{p.productQuantity}}</div>
            <div>Total amount: &#8358; {{p.total}}</div>
          </li>
        </ul>
      </div>

      <div class="col-md-6">
        <h3>Wishlist</h3>
        <div>Click <span class="here" @click="increaseArray">here</span> to add a wish</div>
        <ul id="listOfInputs">
          <li v-for="(x, y) in wishlist" :key="y" class="d-flex">
            
            <div class="m-2 deleteBTN" @click="addWish(y)"><i class="fa fa-plus"></i></div>
            <input class="m-2" type="text" />
            <i class="fa fa-times m-2" @click="remove(y)"></i>
          </li>
        </ul>
        <ul>
          <li>
              <button v-if="wishlist.length > 0" @click="saveInputs" class=" m-2 btn btn-outline-light">Save</button>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import { Toast } from '../main'
import Swal from 'sweetalert2'
import { fb, db } from '../firebase'
export default {
  data () {
    return {
      order: [],
      show: false,
      wishlist: [],
    }
  },
  methods: {
    remove (index) {
      for (let i = 0; i < document.getElementsByTagName("input").length; i++){
        if(document.getElementsByTagName("input")[i].value.trim() == ''){
          Swal.fire({
            icon: 'error',
            background: 'black',
            title: 'Note!',
            text: 'Save your entries before you can delete!',
            confirmButtonColor: '#000000',
          })
          return
        }
      }
      this.wishlist.splice(index, 1)
      this.generate()
      

      
      // let found = this.wishlist.find(x => x.trim() == '')
      // console.log(this.wishlist)
      // if (found) 
      // this.saveInputs()
      // console.log(found)
      // else this.wishlist.splice(index, 1)

    },
    generate () {
      for (let i = 0; i < this.wishlist.length; i++){
        document.getElementsByTagName("input")[i].value = this.wishlist[i]
      }
    },
    addWish () {
      this.wishlist.push('')
    },
    increaseArray () {
      this.wishlist.push('')
    },
    saveInputs () {
      this.wishlist = []
      for (let i = 0; i < document.getElementsByTagName("input").length; i++){
        this.wishlist.push(document.getElementsByTagName("input")[i].value)
      }
      
      var filtered = this.wishlist.filter(x => x.trim() != '')
      this.wishlist = filtered

      for (let i = 0; i < document.getElementsByTagName("input").length; i++){
        document.getElementsByTagName("input")[i].value = this.wishlist[i]
      }
      const user = fb.auth().currentUser;
        if(user)
        db.collection("profiles").doc(user.uid).update({
              wishlist: this.wishlist
          })
          .then(() => {
              Toast.fire({
                icon: 'success',
                title: 'Wishlist saved'
              })
              console.log("Document successfully updated!");
          })
          .catch((error) => {
              Toast.fire({
                icon: 'error',
                title: 'Error updating document'
              })
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
      console.log(this.wishlist)
    }
  },
  firestore () {
    const user = fb.auth().currentUser;
    return {
      profile: db.collection('profiles').doc(user.uid),
    }
  },
  created () {
    const user = fb.auth().currentUser;
    if (user)
    db.collection('profiles').doc(user.uid).get()
      .then(snapshot => {
        if(snapshot.data().orders){
          this.order = snapshot.data().orders
          if (this.order.length > 0)
          this.show = true
        }
        if (snapshot.data().wishlist){
        this.wishlist = snapshot.data().wishlist
        }
      })
      .then(() => {
      this.generate()
      console.log(this.wishlist)
      })
  },
  mounted () {
  }
}
</script>

<style lang="scss">
ul li {
    list-style: none;
}
.deleteBTN {
  cursor: pointer;
}
.here {
  color: red;
  cursor: pointer;
}

</style>