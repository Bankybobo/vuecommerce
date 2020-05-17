<template>
<div class="login">
    <Navbar/>
    <div class="container mt-5 pt-5">
                <div class="box">
                    <h2>Register</h2>
                    <form>
                        <div class="inputbox" :class="{invalid: $v.name.$error}">
                            <input type="text" @input="$v.name.$touch()" v-model="name" required>
                            <label for="Username">
                            <i class="fa fa-user"></i>
                            Username</label>
                            <p v-if="$v.name.$error" class="under-message">Username should be one word. First letter must be an alphabet (e.g. Bankole123). </p>
                        </div>
                        <div class="inputbox" :class="{invalid: $v.email.$error}">
                            <input  @input="$v.email.$touch()"  name="" v-model="email" required>
                            <label for="Email">
                            <i class="fa fa-envelope"></i>
                            Email</label>
                            <p v-if="$v.email.$error" class="under-message">Enter a valid email</p>
                            <!-- <p>{{$v.email}}</p> -->
                        </div>


                        <div class="inputbox" :class="{invalid: $v.password.$error}" >
                            <input @input="$v.password.$touch()" type="password" name=""  @keyup.enter="register" v-model="password" required>
                            <label for="Password">
                            <i class="fa fa-lock"></i>
                            Password</label>
                            <p v-if="$v.password.$error " class="under-message">Password must be at least 8 characters with one uppercase, one lowercase and a special character (e.g. @#$%^&*)</p>
                        </div>

                        <div class="inputbox" :class="{invalid: $v.confirmPassword.$error}" >
                            <input @input="$v.confirmPassword.$touch()" type="password" name=""  @keyup.enter="register" v-model="confirmPassword" required>
                            <label for="confirm-password">
                            <i class="fa fa-lock"></i>
                            Confirm Password</label>
                            <p v-if="!$v.confirmPassword.sameAs" class="under-message">Passwords do not match</p>
                        </div>


                        <button @click.prevent="register" :disabled="$v.$invalid" class="btn btn-outline-danger">Register</button>
                        <p class="to-register">Already registered? Log in <router-link class="route" to="/login">here</router-link></p>
                        
                    </form>
                </div>
            </div>
        </div>
</template>

<script>
import { required, sameAs } from 'vuelidate/lib/validators'
import { fb, db } from '../firebase'
import "firebase/auth"
export default {
    name: "register",
    data () {
      return {
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
      }
    },
    validations: {
        email: {
            required: required,
            unique: reg => {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(reg)
            }
            
        },
        name: {
            required,
            unique: reg => {
                return /^[a-z][a-z0-9'-@#$%^&*]{1,}$/i.test(reg)
            }
        },
        password: {
            required,
            unique: reg => {
                return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(reg)
            }
        },
        confirmPassword: {
            sameAs: sameAs('password')
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

<style lang="scss" scoped>
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
        color: white;
    }
    .box .to-register {
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
        border-bottom: 1px solid rgb(51, 51, 51);
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
        color: lightslategray;
        font-size: 13px;
    }
  
    .route {
        color: #C82324;
    }

    .inputbox.invalid input {
        border-bottom: 1px solid red;
    }
    .under-message {
        margin-top: -40px;
        font-size: 12px;
        color: red;
    }


</style>