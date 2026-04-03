import { sel } from "./util/methods.js";
import { startListeningForCartRenaming } from "./cart__edit.js";

export function displayCart() {
  let cart_temp = sel('#cart');
  cart_temp = cart_temp.content;

  //------ Fetch from storage and destructure
  let cart_data = JSON.parse(localStorage.getItem('SIC-cart-data')) || [];
  let [carts_info, carts] = cart_data;
  //------ Select parent Dom elem and empty it
  let carts_dom = sel('.carts')
  carts_dom.innerHTML = '';
  
  /* ----Loop throught each cart in carts ---- */
  if (carts) {
    carts.forEach(el => {
      renderCart(el);
    });
  }

  function renderCart(cart) {
    let clone = document.importNode(cart_temp, true);
    //--- identify on dom with data-id attr
    sel('.cart', false, clone).setAttribute('data-id', cart.id);
    sel('.cart-name', false, clone).textContent = cart.name;
    if (cart.items) {
      let total_price = 0;
      let body = sel('tbody', false, clone);
      body.innerHTML = '';
      cart.items.forEach((item,i) => {
        body.innerHTML += `
          <tr data-id="${i}" parent-id="${cart.id}">
            <td></td>
            <td>${item.name}</td>
            <td>${item.price}(×${item.qt})</td>
            <td>${item.price * item.qt}</td>
            <td>×</td>
          </tr>
        `;
        total_price += (item.price * item.qt);
      });
      sel('tfoot', false, clone).innerHTML = `
        <tr>
          <td colspan="3">Total</td>
          <td colspan="2">${total_price}</td>
        </tr>
      `;
    }
    carts_dom.prepend(clone);
  }
}

displayCart();
