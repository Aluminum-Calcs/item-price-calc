import { sel } from './util/methods.js';
import { displayCart } from './cart__display.js';
import { updateCartData } from './cart.js';
import { startListeningForCartRenaming } from './cart__edit.js';
import { startListeningForCartDeletion } from './cart__delete.js';

export function startListeningForItemDeletion() {
  let delbtns = sel('tbody tr td:last-of-type', true);
  if (delbtns) {
    delbtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click',()=>{
          deleteItem(btn.closest('tr'));
        })
      }
    });
  }

  function deleteItem(item) {
    let [cart_info, carts] = JSON.parse(localStorage.getItem('SIC-cart-data'));
    let cart_id = item.getAttribute('parent-id');
    let it_id = item.getAttribute('data-id');
    // --- Find the item remove it from the stack
    carts[cart_id].items.splice(it_id, 1);

    updateCartData(cart_info, carts);
    displayCart();
    //------making it recursive because of the event listeners
    startListeningForItemDeletion();
    startListeningForCartDeletion();
    startListeningForCartRenaming();
  }
}

setTimeout(() => {
  startListeningForItemDeletion();
})