import { modal } from "./modal.js";
import { displayCart } from "./cart__display.js";
import { startListeningForCartRenaming } from "./cart__edit.js";
import { startListeningForCartDeletion } from "./cart__delete.js";



/*
This Json data is supposed to hold three data:
  1. The current cart ID
  2. The total number of carts in the system
The UI will give the user the chance to switch between carts and update each of them as they so choose. When they click on a cart and wish to add an item to that cart, the current-cart-ID should change to the data-id of the cart in the UI and add input to that cart.

The UI should also prepend the container containing the carts with the newest modified cart.
*/

export default function decideAction(item, action_type) {
  let cart_data = JSON.parse(localStorage.getItem('SIC-cart-data')) || [];
  let [carts_info, carts] = (cart_data.length == 0) ? [{
    current: 0
  }, [
    {
      name: 'Cart 0',
      id: 0,
      items: []
    }
    ]] : cart_data;
  
  //------------------------(object, string)

  if (action_type == 'add') {
    addToCart(item)
  } else if ('new') {
    carts_info.current++;
    createNewCart(item)
  }
  function addToCart(item, cart_id = carts_info.current) {
    //Check if the specified CART exists in CARTS arr
    if (carts.length >= cart_id) {
      console.log('adding an item to an existing cart: ', cart_id)
      console.log(carts[cart_id].items)
      carts[cart_id].items.push(item);
      updateCartData(carts_info, carts);
      displayCart();
      startListeningForCartRenaming();
      startListeningForCartDeletion();
    } else {
      /* A whole non-existing cart was selected on looked for 
        Pop a modal asking the user to create a new cart and name it. This is meant to catch any errors.
      */
      console.log('This cart does not exist in storage');
      createNewCart(item);
    }
    //------------------------------------------//
    // Take a look at your current carts
    console.log(carts);
  }
  
  async function createNewCart(item) {
    let ans = await modal(
      ['Create New Cart', 'Create a new cart and name it'],
      ['confirm', 'cancel'],
      {
        shouldRenderInput: true,
        label: 'Name your cart',
        placeholder: `Cart ${carts.length}`
      }
    )
    if (ans.decision != null) {
      let cart_obj = {
        name: ans.cartName,
        id: carts.length,
        items: []
      }
      carts.push(cart_obj);
      carts_info.current = cart_obj.id//Increment current cart
      addToCart(item, cart_obj.id);
    }
  }
}


export function updateCartData(carts_info, carts) {
  //Push to local storage;
  // console.log([carts_info, carts])
  localStorage.setItem('SIC-cart-data', JSON.stringify([carts_info, carts]))
}
