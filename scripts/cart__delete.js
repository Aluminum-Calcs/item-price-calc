import { sel } from "./util/methods.js";
import { modal } from "./modal.js";
import { updateCartData } from "./cart.js";
import { displayCart } from "./cart__display.js";
import { startListeningForCartRenaming } from "./cart__edit.js";
import { startListeningForItemDeletion } from './cart__item__edit.js';


export function startListeningForCartDeletion() {
  let carts = sel('.cart', true);
  if (carts) {
    carts.forEach(cart => {
      let deletebtn = sel('.delete-cart', false, cart);
      if (deletebtn) {
        deletebtn.addEventListener('click', () => {
          del(deletebtn.closest('.cart'));
        })
      }
    });
  }
  
  async function del(cartElem) {
    //-----------Get the ID of the cart from the element
    let cart_id = cartElem.getAttribute('data-id');
    let [cart_info, carts_in_local] = JSON.parse(localStorage.getItem('SIC-cart-data'));
    console.log(cart_info)
    
    //-----------Renaming
    let reply = await modal(
      ['Delete Cart', `Are you sure you want to delete <b>${carts_in_local[cart_id].name}</b><br>No going back!.`],
      ['yes', 'no, cancel']
    );
    const { decision } = reply;
    if (decision == 'yes') {
      console.log(decision)
      //Do the main stuff here
      // ------ Look for it in the stack and remove it
      carts_in_local.splice(cartElem.getAttribute('data-id'), 1);
      // ------ Rearrange all the ids in the stack
      carts_in_local.forEach((el, i) => el.id = i);
      //Go on
      if ((cart_info.current + 1) == carts_in_local.length) {
        console.log('switching current')
        (cart_info.current > 0)
          ? cart_info.current--
        : cart_info.current = 0;
      }

      updateCartData(cart_info, carts_in_local);
      displayCart();
    }
    //------making it recursive because of the event listeners
    startListeningForCartDeletion();
    startListeningForCartRenaming();
    startListeningForItemDeletion();
  }
}

setTimeout(() => {
  startListeningForCartDeletion();
})
