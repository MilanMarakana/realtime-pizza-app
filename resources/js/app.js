const axios = require('axios');
const Noty = require('noty');

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cart-counter');

const updateCart = async (pizza) => {
  await axios
    .post('/update-cart', pizza)
    .then((res) => {
      console.log(res);
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: 'success',
        timeout: 1000,
        progressBar: false,
        text: 'Item added to cart. Thank you!',
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: 'error',
        timeout: 1000,
        progressBar: false,
        text: 'Sorry, Something went wrong! ',
      }).show();
      console.log(err);
    });
};

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});
