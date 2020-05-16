<template>
<div class="login">
    <Navbar/>
    <div class="container mt-5 pt-5">
                <div class="box">
                    <h2>Register</h2>
                    <form>
                        <div class="inputbox">
                            <input type="text"  name="" v-model="name" required>
                            <label for="Username">
                            <i class="fa fa-user"></i>
                            Username</label>
                        </div>
                        <div class="inputbox">
                            <input type="mail"  name="" v-model="email" required>
                            <label for="Email">
                            <i class="fa fa-envelope"></i>
                            Email</label>
                        </div>
                        <div class="inputbox">
                            <input type="password" name=""  @keyup.enter="register" v-model="password" required>
                            <label for="Password">
                            <i class="fa fa-lock"></i>
                            Password</label>
                        </div>
                        <button @click.prevent="register" class="btn btn-outline-danger">Register</button>
                        <p>Already registered? Log in <router-link class="route" to="/login">here</router-link></p>
                        
                    </form>
                </div>
            </div>
        </div>
</template>

<script>
import { fb, db } from '../firebase'
import "firebase/auth"
export default {
    name: "register",
    data () {
      return {
          name: '',
          email: '',
          password: ''
      }
    },
    methods: {
        register () {
            console.log(this.name, this.email)
          fb.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
              db.collection('profiles').doc(user.user.uid).set({
                  name: this.name,
                  cart: []
            })
            console.log('Document created successfully. ID is ', user.user.uid)
            this.$router.replace({name: 'profile'})
            //   This is to show that upon registeration, we have access to each user's unique id
            })
            .catch((error) => console.log(error))
      }
    }
}
</script>

<style scoped>
    .login {
    background:url('../assets/images/controller1.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-position: cover;
    min-height: 100vh;
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
    .route {
        color: #C82324;
    }


</style>