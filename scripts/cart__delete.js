import { sel } from "./util/methods.js";
import { modal } from "./modal.js";
import { updateCartData } from "./cart.js";
import { displayCart } from "./cart__display.js";

export function startListeningForCartDeletion() {
  localStorage.clear()
  let carts = sel('.cart', true);
  if (carts) {
    carts.forEach(cart => {
      let deletebtn = sel('.delete-cart', false, cart);
      if (deletebtn) {
        deletebtn.addEventListener('click', (e) => {
          del(deletebtn.closest('.cart'));
        })
      }
    });
  }
  
  async function del(cartElem) {
    //-----------Get the ID of the cart from the element
    let cart_id = cartElem.getAttribute('data-id');
    let [cart_info, carts_in_local] = JSON.parse(localStorage.getItem('SIC-cart-data'));
    
    //-----------Renaming
    let reply = await modal(
      ['Delete Cart', `Are you sure you want to delete <b>${carts_in_local[cart_id].name}</b><br>No going back!.`],
      ['Yes', 'no, cancel']
    );
    if ((reply.decision).toLowerCase() == 'yes') {
      //Do the main stuff here
      //Look for it in the stack
      //remove it
      //rearrange all the ids in the stack
      //rearrange the id property of each cart
      //Go on


      // updateCartData(cart_info, carts_in_local);
      // displayCart();
    }
    //------making it recursive because of the event listeners
    // startListeningForCartDeletion();
  }
}

startListeningForCartDeletion();
