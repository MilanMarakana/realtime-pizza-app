const cartController = () => {
  return {
    cart(req, res) {
      res.render('customers/cart');
    },

    update(req, res) {
      //init a cart if there is no cart in session first time
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      let cart = req.session.cart;

      //check if item does not exits in cart
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };
        cart.totalQty += 1;
        cart.totalPrice += req.body.price;
      } else {
        cart.items[req.body._id].qty += 1;
        cart.totalQty += 1;
        cart.totalPrice += req.body.price;
      }

      console.log(req.body);
      return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
};

module.exports = cartController;
