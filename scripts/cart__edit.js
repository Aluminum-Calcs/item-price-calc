import { sel } from './util/methods.js';
import { modal } from './modal.js';
import { updateCartData } from './cart.js';
import { displayCart } from './cart__display.js';
import { startListeningForCartDeletion } from './cart__delete.js';
import { startListeningForItemDeletion } from './cart__item__edit.js';

// Don't mind my naming methods
export function startListeningForCartRenaming() {
  let carts_in_dom = sel('.cart', true);

  if (carts_in_dom) {
    carts_in_dom.forEach(cart => {
      let editbtn = sel('.edit-cart', false, cart);
      if (editbtn) {
        editbtn.addEventListener('click', () => {
          rename(editbtn.closest('.cart'));
        })
      }
    });
  }
  
  async function rename(cartElem) {
    //-----------Get the ID of the cart from the element
    let cart_id = cartElem.getAttribute('data-id');
    let [cart_info, carts_in_local] = JSON.parse(localStorage.getItem('SIC-cart-data'));
    
    //-----------Renaming
    let reply = await modal(
      ['Rename Your Cart', 'Create a new name for your cart'],
      ['rename', 'cancel'],
      {
        shouldRenderInput: true,
        label: 'Name your cart',
        placeholder: carts_in_local[cart_id].name
      }
    );
    if (reply.decision != null || reply.decision != 'cancel') {
      carts_in_local[cart_id].name = reply.cartName;
      updateCartData(cart_info, carts_in_local);
      displayCart();
    }
    //------making it recursive because of the event listeners
    startListeningForCartRenaming();
    startListeningForCartDeletion();
    startListeningForItemDeletion();
  }
}

setTimeout(() => {
  startListeningForCartRenaming()
})
