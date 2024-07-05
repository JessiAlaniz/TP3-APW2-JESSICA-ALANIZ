
export const addToCart = (id, name, price, image, quantity, key) => {
    const cart = JSON.parse(localStorage.getItem(key)) || {};
    cart[id] = { id,name, price, image, quantity };
    localStorage.setItem(key, JSON.stringify(cart));

};