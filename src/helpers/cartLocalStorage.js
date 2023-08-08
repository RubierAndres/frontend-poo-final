export const getCartLocalStorage = () => {
   try {
      const cart = localStorage.getItem('cart_poo');
      return cart ? JSON.parse(cart) : [];
   } catch (err) {
      console.log(err);
   }
};

export const saveCartLocalStorage = (cart) => {
   cart = JSON.stringify(cart);
   localStorage.setItem('cart_poo', cart);
};