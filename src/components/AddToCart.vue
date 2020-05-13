<template>
    <div class="hello">
         <button @click="addToCart" class="btn-outline-danger btn">Add To cart</button>
    </div>
  
</template>


<script>
export default {
    name: "add-to-cart",
    props: {
        name: String,
        price: String,
        productId: String,
        image: String
    },
    data () {
        return {
            item: {
                productName: this.name,
                productPrice: this.price,
                productID: this.productId
            }
        }
    }, 
    methods: {
        addToCart () {
            this.$store.commit('addToCart', this.item)
            // store.commit will accept two parameters. First one is the name of
            // the method you want to mutate in the store (addToCart). 
            // Second parameter is the object or variable you want to send to the 
            // addToCart method that you will be mutating int he store.
        }
    }

}
</script>


<style scoped lang="scss">
button {
    margin: 10px 5px;
    outline: none;
    font-size: 10px;
}


</style>
