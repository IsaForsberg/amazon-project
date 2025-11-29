import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
  <select class="js-quantity-selector" data-product-id="${product.id}">
    ${[1,2,3,4,5,6,7,8,9,10].map(num => `
      <option value="${num}" ${num === 1 ? 'selected' : ''}>${num}</option>
    `).join('')}
  </select>
</div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      // hitta rätt select för denna produkt
      const select = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
      const quantity = Number(select.value);

      // lägg till i cart med rätt quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(productId);
      }

      updateCartQuantity();
    });
  });



