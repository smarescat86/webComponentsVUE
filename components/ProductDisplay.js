app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template:
    /*html*/
    `<div class="product-display">
            
    <div class="product-container">
        <div class="product-image">
            <img v-bind:src="image" :class="{'out-of-stock-img': !inStock}">
            <a v-bind:href="url">Tienda principal</a>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-else>Out of Stock</p>

            <p> Shipping: {{ shipping }}</p>

            <p v-if="onSale">{{ saleMessage }}</p>
            
            <ul>
                <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
            </ul>
            <div 
                v-for="(variant, index) in variants" 
                :key="variant.id" 
                @mouseover="updateVariant(index)"
                class="color-circle"
                :style="{backgroundColor: variant.color}">
            </div>

            <button class="button" v-on:click="addToCart" :class="{disabledButton: !inStock}" :disabled="!inStock">Add to Cart</button>

            <button class="button" @click="removeFromCart">Remove item</button>
        </div>
    </div>
    <review-list v-if="reviews.length > 0" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
</div>`,

data() {
    return {
        product: 'Shoes',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        description: 'En el mercado hay cantidad de zapatillas ligeras orientadas a la velocidad, pero no muchas son capaces de rendir como lo hacen las Solution Speed FF2.',
        url: 'https://www.asics.com/es/es-es/',
        inventory: 11,
        onSale: true,
        details: ['Tenis', 'Padel'],
        variants: [
            {id: 1, color: 'white', image:'./assets/images/z_white.jpeg', quantity: 50},
            {id: 2, color: 'black', image:'./assets/images/z_black.jpeg', quantity: 0}
        ],
        sizes: [39, 40, 41, 42],
        reviews: []
    }
},

methods: {
    addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
    },

    updateVariant(index) {
        this.selectedVariant = index;
    },

    removeFromCart() {
        this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
    },

    addReview(review) {
        this.reviews.push(review);
    }
},

computed: {
    title() {
        return this.brand + ' ' + this.product;
    },
    image() {
        return this.variants[this.selectedVariant].image;
    },
    inStock() {
        return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
        type = 2.99;
        if(this.premium) {
            type = 'Free'
        }
        return type
    },
    saleMessage() {
        text = "";
        if(this.onSale){
            text = this.brand + ' ' + this.product + 'is on sale';
        }
        return text;
    }
}
})