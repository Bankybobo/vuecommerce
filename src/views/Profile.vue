<template>
  <div class="profile">
    <Navbar/>
   <div class="container mt-5 pt-5">
      <div class="box">
        <h2>Account Details</h2>
        <form>
            <div class="inputbox">
                <input type="text"   v-model="profile.name" required>
                <label for="name">
                <i class="fa fa-user"></i>
                Name</label>
            </div>

            <div class="inputbox">
                <input type="text"  @keyup.enter="login" v-model="profile.phone" required>
                <label for="phone">
                <i class="fa fa-phone"></i>
                Phone Number</label>
            </div>

            <div class="inputbox">
                <input type="text"  @keyup.enter="login" v-model="profile.address" required>
                <label for="address">
                <i class="fa fa-address-book"></i>
                Address</label>
            </div>
            <div class="inputbox">
                <input type="text"  @keyup.enter="login" v-model="profile.postCode" required>
                <label for="postCode">
                <i class="fa fa-map-pin"></i>
                Postal Code</label>
            </div>
            <input style="font-size: 12px" type="button" @click.prevent="updateProfile" value="Save Changes" class="btn btn-outline-light">
            <input style="font-size: 12px" type="button" @click.prevent="resetPassword" value="Reset password email" class="btn ml-4 btn-outline-danger">
            
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import { fb, db} from '../firebase';
import { Toast } from '../main'

export default {
  name: "profile",
  components: {
    // VueEditor
  },
  props: {
    msg: String
  },

  data(){
    return {
        profile: {
          name:null,
          phone:null,
          address:null,
          postcode:null
        },

        account:{
            name:null,
            email:null,
            photoUrl:null,
            emailVerified:null,
            password:null,
            confirmPassword:null,
            uid:null
        }       
    }
  },

  firestore(){
      const user = fb.auth().currentUser;
      return {
        profile: db.collection('profiles').doc(user.uid),
      }
  },
  methods:{
      resetPassword(){
          const auth = fb.auth();          

          auth.sendPasswordResetEmail(auth.currentUser.email).then(() =>  {
               Toast.fire({
                type: 'success',
                title: 'Email sent'
              })
          }).catch((error) =>  {
              console.log(error);
          });
      },

      updateProfile(){
          this.$firestore.profile.update(this.profile);
          this.$router.replace({name: 'productlist'})
      },
      uploadImage(){}
  },
  created(){
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.display-picture {
  height: 250px;
  width: 180px;
  border: 1px solid red;
  margin-block: 10px;
}
.main {
        font-family: 'Josefin Sans', sans-serif;
    }
    .box {
        position: absolute;
        top: 40%;
        left: 35%;
        transform: translate(-30%, -30%);
        width: 400px;
        padding: 40px;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 10px;
    }

    .box h2 {
        margin-bottom: 40px;
        padding: 0;
        color: #C82324;
    }
    .box p {
        margin-bottom: 40px;
        padding: 0;
        color: lightslategray;
    }
    .box .inputbox {
        position: relative;
        
    }
    .box .inputbox input {
        width: 100%;
        padding: 5px 0;
        font-size: 16px;
        letter-spacing: 1px;
        color: #fff;
        margin-bottom: 45px;
        border: none;
        outline: none;
        background: transparent;
        border-bottom: 1px solid #C82324;
    }
    .box .inputbox label {
        position: absolute;
        top: 0;
        letter-spacing: 1px;
        left: 0;
        padding: 5px 0;
        font-size: 16px;
        color: lightslategray;
        pointer-events: none;
        transition: .5s;
    }
    .box .inputbox input:focus ~ label,
    .box .inputbox input:valid ~ label {
        top: -23px;
        left: 0;
        color: rgb(241, 86, 86);
        font-size: 13px;
    } 

</style>
