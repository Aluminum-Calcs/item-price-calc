import { sel } from "./util/methods.js";

let cart_temp = sel('#cart');
cart_temp = cart_temp.content;

export function displayCart(name) {
  let cart_data = JSON.parse(localStorage.getItem('SIC-cart-data')) || [];
  let [carts_info, carts] = cart_data;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////--Continue here

  let clone = document.importNode(cart_temp, true);
  //---- Now start ammending stuff----//
  sel('.cart', false, clone).setAttribute('data-id', 1);
  sel('.cart-name', false, clone).textContent = name

  //--------- Publish it -------//
  let carts_dom = sel('.carts')
  carts_dom.prepend(clone);
}

// displayCart('Oga')