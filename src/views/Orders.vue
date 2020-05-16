<template>
  <div class="container">
    <Navbar/>
    <div class="row pt-5 mt-5">
      <div class="col-md-4" v-if="show"><h4>Your order has been completed, a member of our team will contact you.</h4></div>
      <div class="col-md-4" v-else><h4>You have no order yet</h4></div>
      <div class="col-md-12" v-show="show">
        <ul>
          <li class="my-4" v-for="(p, y) in order" :key="y">
            <div>Name: {{p.productName}}</div>
            <div>Price: {{p.productPrice}}</div>
            <div>Quantity: {{p.productQuantity}}</div>
            <div>Total amount: &#8358; {{p.total}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from '../firebase'
export default {
  data () {
    return {
      order: [],
      show: false
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
    db.collection('profiles').doc(user.uid).get()
      .then(snapshot => {
        if(snapshot.data().orders){
          this.order = snapshot.data().orders
          if (this.order.length > 0)
          this.show = true
        }

      });
    }
}
</script>

<style lang="scss">
ul li {
    list-style: none;
}

</style>