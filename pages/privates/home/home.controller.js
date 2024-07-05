import { card } from "../../../components/homeComponents/card.js";
import { AllProducts, ProductsByCategory } from "../../../api/productos.api.js";
import { Redireccionar } from "../../../functions/redireccion.js";
import { showNotification } from "../../../functions/notificacionProd.js";
import { addToCart } from "../../../functions/addLocalStorage.js";
import { allCategories } from "../../../api/categories.api.js";
import { categoriesCarrito } from "../../../components/homeComponents/categories.js";



const btnAllProducts = document.getElementById('all-products-btn');
const btnProductsByCategory = document.getElementById('category-select');
const btnCart = document.getElementById('cart-btn'); // Botón "Mi Carrito"

Redireccionar(btnCart, '../carrito/carrito.html')

document.addEventListener('DOMContentLoaded',async () => {
const categories = await allCategories()
console.log(categories)

categories.forEach(cat => {
const catCarrito = categoriesCarrito(cat.id, cat.nombre)
btnProductsByCategory.insertAdjacentHTML('beforeend', catCarrito);

});
})

// Event listener para mostrar todos los productos
btnAllProducts.addEventListener('click', async () => {
    const productos = await AllProducts();
    await renderizado(productos);
});

// Event listener para mostrar productos por categoría
btnProductsByCategory.addEventListener('change', async () => {
    const indice = btnProductsByCategory.value;
    const productos = await ProductsByCategory(indice);
    await renderizado(productos);
});

const renderizado = (productos) => {
    const grilla = document.getElementById('grid');
    const productosHTML = productos.map(producto => {
        const listProd = card(producto.id, producto.imagen, producto.nombre, producto.desc, producto.precio, producto.en_stock);
        return listProd;
    }).join('');
    grilla.innerHTML = productosHTML;
    attachIncrementDecrementListeners();
    attachAddToCartListeners();
    loadCartQuantities();
};

const loadCartQuantities = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    for (const [id, product] of Object.entries(cart)) {
        const input = document.getElementById(`quantity-${id}`);
        if (input) {
            input.value = product.quantity;
        }
    }
};

// Función para adjuntar event listeners a los botones de incremento y decremento
const attachIncrementDecrementListeners = () => {
    document.querySelectorAll('.increment-btn').forEach(btnIncrement => {
        btnIncrement.addEventListener('click', () => {
            const id = btnIncrement.dataset.id;
            const input = document.getElementById(`quantity-${id}`);
            const productDiv = document.getElementById(`product-${id}`);
            const name = productDiv.querySelector('.product-name').textContent;
            const price = productDiv.querySelector('.product-price').textContent.replace('$', '');
            const image = productDiv.querySelector('img').src;
            let value = parseInt(input.value, 10);
            value = isNaN(value) ? 0 : value;
            value++;
            input.value = value;
            
        });
    });

    document.querySelectorAll('.decrement-btn').forEach(btnDecrement => {
        btnDecrement.addEventListener('click', () => {
            const id = btnDecrement.dataset.id;
            const input = document.getElementById(`quantity-${id}`);
            const productDiv = document.getElementById(`product-${id}`);
            const name = productDiv.querySelector('.product-name').textContent;
            const price = productDiv.querySelector('.product-price').textContent.replace('$', '');
            const image = productDiv.querySelector('img').src;
            let value = parseInt(input.value, 10);
            value = isNaN(value) ? 0 : value;
            value = value > 1 ? value - 1 : 1;
            input.value = value;
            addToCart(id, name, price, image, value,'cart');
        });
    });
};


// Función para adjuntar event listeners a los botones de agregar al carrito
const attachAddToCartListeners = () => {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = button.dataset.id;
            const productDiv = document.getElementById(`product-${id}`);
            const quantity = parseInt(document.getElementById(`quantity-${id}`).value, 10);
            const name = productDiv.querySelector('.product-name').textContent;
            const price = productDiv.querySelector('.product-price').textContent.replace('$', '');
            const image = productDiv.querySelector('img').src;

            addToCart(id, name, price, image, quantity,'cart');
            showNotification(id, 'Producto agregado al carrito con éxito');
        });
    });
};








