import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService, Product } from './product.service';

interface CartItem extends Product {
  id: number;
  quantity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormsModule]
})
export class App implements OnInit {

  // ================================
  // PRODUCTS & CART
  // ================================

  products: Product[] = [];
  cart: CartItem[] = [];


  // ================================
  // PAGE CONTROLS
  // ================================

  showCart = false;
  showCheckout = false;
  showConfirmation = false;


  // ================================
  // LAST ORDER
  // ================================

  lastOrder: any = null;


  // ================================
  // SEARCH & CATEGORY FILTER
  // ================================

  searchTerm = '';
  selectedCategory = 'All Categories';


  // ================================
  // CUSTOMER DETAILS
  // ================================

  customer = {
    fullName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  };


  // ================================
  // PAYMENT METHOD
  // ================================

  paymentMethod = 'Cash on Delivery';


  // ================================
  // CONSTRUCTOR
  // ================================

  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {}


  // ================================
  // INITIALIZE
  // ================================

  ngOnInit(): void {
    this.loadProducts();
  }


  // ================================
  // LOAD PRODUCTS
  // ================================

  loadProducts(): void {

    this.productService.getProducts().subscribe({

      next: (data) => {

        this.products = data.map((product, index) => ({
          ...product,
          id: index + 1
        }));

      },

      error: (error) => {

        console.error(
          'Failed to load products:',
          error
        );

      }

    });

  }


  // ================================
  // SEARCH + CATEGORY FILTER
  // ================================

  get filteredProducts(): Product[] {

    return this.products.filter(product => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            this.searchTerm.toLowerCase()
          );

      const matchesCategory =
        this.selectedCategory === 'All Categories' ||
        product.category === this.selectedCategory;

      return matchesSearch && matchesCategory;

    });

  }


  // ================================
  // ADD TO CART
  // ================================

  addToCart(product: Product): void {

    const productId = product.id!;

    const existingItem = this.cart.find(
      item => item.id === productId
    );

    if (existingItem) {

      existingItem.quantity++;

    } else {

      this.cart.push({

        ...product,

        id: productId,

        quantity: 1

      });

    }

    this.showCart = true;
    this.showCheckout = false;
    this.showConfirmation = false;

  }


  // ================================
  // INCREASE QUANTITY
  // ================================

  increaseQuantity(item: CartItem): void {

    item.quantity++;

  }


  // ================================
  // DECREASE QUANTITY
  // ================================

  decreaseQuantity(item: CartItem): void {

    if (item.quantity > 1) {

      item.quantity--;

    } else {

      this.removeFromCart(item);

    }

  }


  // ================================
  // REMOVE FROM CART
  // ================================

  removeFromCart(item: CartItem): void {

    this.cart = this.cart.filter(
      cartItem => cartItem.id !== item.id
    );

  }


  // ================================
  // CART COUNT
  // ================================

  getCartCount(): number {

    return this.cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  }


  // ================================
  // SUBTOTAL
  // ================================

  getSubtotal(): number {

    return this.cart.reduce(
      (total, item) =>
        total + (
          item.price * item.quantity
        ),
      0
    );

  }


  // ================================
  // SHIPPING
  // ================================

  getShipping(): number {

    return this.cart.length > 0
      ? 300
      : 0;

  }


  // ================================
  // FINAL TOTAL
  // ================================

  getTotal(): number {

    return (
      this.getSubtotal() +
      this.getShipping()
    );

  }


  // ================================
  // SHOW / HIDE CART
  // ================================

  toggleCart(): void {

    this.showCart = !this.showCart;

    this.showCheckout = false;
    this.showConfirmation = false;

  }


  // ================================
  // PROCEED TO CHECKOUT
  // ================================

  proceedToCheckout(): void {

    if (this.cart.length === 0) {

      alert('Your cart is empty.');

      return;

    }

    this.showCart = false;
    this.showCheckout = true;
    this.showConfirmation = false;

  }


  // ================================
  // BACK TO CART
  // ================================

  backToCart(): void {

    this.showCheckout = false;
    this.showCart = true;
    this.showConfirmation = false;

  }


  // ================================
  // PLACE ORDER
  // ================================

  placeOrder(): void {

    // Validate customer details

    if (
      !this.customer.fullName ||
      !this.customer.email ||
      !this.customer.phone ||
      !this.customer.address
    ) {

      alert(
        'Please fill in all required customer details.'
      );

      return;

    }


    // Prepare order data

    const orderData = {

      customer: {

        fullName:
          this.customer.fullName,

        firstName:
          this.customer.firstName,

        lastName:
          this.customer.lastName,

        email:
          this.customer.email,

        phone:
          this.customer.phone,

        address:
          this.customer.address

      },


      items: this.cart.map(item => ({

        productId:
          item._id || String(item.id),

        name:
          item.name,

        category:
          item.category,

        price:
          item.price,

        quantity:
          item.quantity,

        image:
          item.image

      })),


      paymentMethod:
        this.paymentMethod,


      subtotal:
        this.getSubtotal(),


      shipping:
        this.getShipping(),


      total:
        this.getTotal()

    };


    // Send order to backend

    this.http
      .post(
        'http://localhost:5000/api/orders',
        orderData
      )
      .subscribe({

        // ================================
        // SUCCESS
        // ================================

        next: (response: any) => {

          console.log(
            'Order saved:',
            response
          );


          // Store the saved order

          this.lastOrder = response.order;


          // Clear cart

          this.cart = [];


          // Show confirmation page

          this.showCheckout = false;
          this.showCart = false;
          this.showConfirmation = true;


          // Clear customer details

          this.customer = {

            fullName: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: ''

          };


          // Reset payment method

          this.paymentMethod =
            'Cash on Delivery';

        },


        // ================================
        // ERROR
        // ================================

        error: (error) => {

          console.error(
            'Order failed:',
            error
          );

          alert(
            'Failed to place order. Please try again.'
          );

        }

      });

  }


  // ================================
  // CONTINUE SHOPPING
  // ================================

  continueShopping(): void {

    this.showConfirmation = false;
    this.showCheckout = false;
    this.showCart = false;

    this.lastOrder = null;

  }


  // ================================
  // FORMAT PRICE
  // ================================

  formatPrice(price: number): string {

    return '₹' +
      price.toLocaleString('en-IN');

  }

}