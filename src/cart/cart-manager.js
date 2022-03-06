const key = "it-spa-cart";

export const cartManager = {
  addItem(item) {
    const cart = localStorage.getItem(key);

    if (cart === null) {
      const serializedContent = JSON.stringify([item]);
      localStorage.setItem(key, serializedContent);
    } else {
      const parsedContent = JSON.parse(cart);
      parsedContent.push(item);
      const serializedContent = JSON.stringify(parsedContent);
      localStorage.setItem(key, serializedContent);
    }
  },

  removeItem(item) {
    const cart = localStorage.getItem(key);

    if (cart !== null) {
      const parsedContent = JSON.parse(cart);
      const filteredContent = parsedContent.filter(
        (cartItem) => cartItem.name !== item.name
      );
      const serializedContent = JSON.stringify(filteredContent);
      localStorage.setItem(key, serializedContent);
    }
  },

  getAllItems() {
    const cart = localStorage.getItem(key);

    if (cart === null) {
      return [];
    } else {
      return JSON.parse(cart);
    }
  },

  getTotal() {
    const cart = localStorage.getItem(key);

    if (cart === null) {
      return 0;
    } else {
      const parsedContent = JSON.parse(cart);

      return parsedContent.map((item) => item.price).reduce((a, b) => a + b, 0);
    }
  },
};
