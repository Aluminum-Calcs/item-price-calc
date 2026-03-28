import { sel } from "./util/methods.js";

let cart_temp = sel('#cart');
cart_temp = cart_temp.content;

export function displayCart() {
  //------ Fetch from storage and destructure
  let cart_data = JSON.parse(localStorage.getItem('SIC-cart-data')) || [];
  let [carts_info, carts] = cart_data;
  //------ Select parent Dom elem and empty it
  let carts_dom = sel('.carts')
  carts_dom.innerHTML = '';
  
  /* ----Loop throught each cart in carts ---- */
  if (carts) {
    console.log('rendering carts')
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
      console.log('rendering items')
      let total_price = 0;
      let body = sel('tbody', false, clone);
      body.innerHTML = '';
      cart.items.forEach(item => {
        body.innerHTML += `
          <tr>
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
