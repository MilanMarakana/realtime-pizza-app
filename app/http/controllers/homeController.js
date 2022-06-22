const Menu = require('../../models/menu');

const homeController = () => {
  return {
    async home(req, res) {
      const pizzaes = await Menu.find();
      res.render('home', { pizzaes: pizzaes });
      console.log(pizzaes);
      // Menu.find().then((pizzaes) => {
      //   console.log(pizzaes);
      //   res.render('home', { pizzaes: pizzaes });
      // });
    },
  };
};

module.exports = homeController;
