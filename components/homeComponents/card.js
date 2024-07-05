export const card = (id, imagen, titulo, descripcion, precio, estado) => {
  const stock = estado ? 'Sí' : 'No';
  const colorstock = stock == 'Sí' ? 'text-green-600' : 'text-red-600';

  return `
  <div id="product-${id}" class="bg-white shadow-md rounded-lg overflow-hidden">
    <img src="${imagen}" alt="${titulo}" class="h-48 w-full object-cover">
    <div class="p-4">
      <h3 class="product-name text-lg font-semibold">${titulo}</h3>
      <p class="text-gray-600">${descripcion}</p>
      <p class="product-price text-gray-800 font-bold">$${precio.toFixed(2)}</p>
      <p class="${colorstock}">Stock: ${stock}</p>
      <div class="flex items-center mt-4">
        <button data-id="${id}" class="decrement-btn bg-red-500 text-white px-2 py-1 rounded">-</button>
        <input type="text" id="quantity-${id}" value="1" class="w-12 text-center mx-2 border border-gray-300 rounded" readonly>
        <button data-id="${id}" class="increment-btn bg-blue-500 text-white px-2 py-1 rounded">+</button>
      </div>
      <button data-id="${id}" class="mt-4 bg-green-500 text-white px-4 py-2 rounded add-to-cart-btn">Agregar al Carrito</button>
    </div>
  </div>
`;
};
