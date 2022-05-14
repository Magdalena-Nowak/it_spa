const key = "it-spa-cart";

export const cartManager = {
  addItem(item) {
    const cart = localStorage.getItem(key);
    const itemDetails = {
      id: item.id,
      value: 1,
      name: item.name,
      price: item.price,
    };

    if (cart === null) {
      const serializedContent = JSON.stringify([itemDetails]);
      localStorage.setItem(key, serializedContent);
    } else {
      const parsedContent = JSON.parse(cart);
      let itemIndex;
      const filteredItem = parsedContent.find((cartItem, index) => {
        if (cartItem.id === item.id) {
          itemIndex = index;
          return cartItem;
        }
      });

      if (filteredItem) {
        filteredItem.value += 1;
        parsedContent.splice(itemIndex, 1, filteredItem);
      } else {
        parsedContent.push(itemDetails);
      }

      const serializedContent = JSON.stringify(parsedContent);
      localStorage.setItem(key, serializedContent);
    }
  },

  substractItem(item) {
    const cart = localStorage.getItem(key);

    if (cart !== null) {
      const parsedContent = JSON.parse(cart);

      let itemIndex;
      const filteredItem = parsedContent.find((cartItem, index) => {
        if (cartItem.id === item.id) {
          itemIndex = index;
          return cartItem;
        }
      });

      if (filteredItem) {
        filteredItem.value -= 1;

        if (filteredItem.value === 0) {
          parsedContent.splice(itemIndex, 1);
        } else {
          parsedContent.splice(itemIndex, 1, filteredItem);
        }
      }

      const serializedContent = JSON.stringify(parsedContent);
      localStorage.setItem(key, serializedContent);
    }
  },

  removeAll(item) {
    const cart = localStorage.getItem(key);

    if (cart !== null) {
      const parsedContent = JSON.parse(cart);
      const filteredContent = parsedContent.filter(
        (cartItem) => cartItem.id !== item.id
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
      return parsedContent.map((item) => item.price * item.value).reduce((a, b) => a + b, 0);
    }
  },
};