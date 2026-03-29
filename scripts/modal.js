import { sel, isEmpty } from './util/methods.js';

let modal_temp = sel('#modal-popup');
modal_temp = modal_temp.content;

export function modal([heading,message], options, input) {
  return new Promise((resolve) => {
    
    let reply = {
      decision: null
    }
    let clone = document.importNode(modal_temp, true);
    //-----------------------------------------//
    // Start adding text content of the modal
    /* Header ----------- */
    sel('.h2', false, clone).innerHTML = heading;
    sel('.message', false, clone).innerHTML = message;
    
    /* Body and Input ------- */
    if (input != undefined /*|| !isEmpty(input) */|| input != null) {
      sel('[for=modal-input]', false, clone).textContent = input.label;
      sel('.modal-input-elem', false, clone).placeholder = input.placeholder;
      sel('.modal-input-elem', false, clone).value = input.placeholder;
    } else {
      sel('.modal__body__input', false, clone)?.remove()
    }
  
    /* Footer ---------- */
    sel('.modal__footer', false, clone).innerHTML = options.map(element => {
      let html = ``;
      html += `<button>${element}</button>`
      return html;
    }).join('');
  
    //------------------------------------//
    // Now publish the modal
    sel('main').append(clone);
  
  
    //-----------------------------------------//
    // -----------now listen for responses
    let buttons = sel('.modal__footer>button,.modal-popup>.overlay,.modal__header>button', true);
    if (buttons) {
      buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          if (e.target.classList.contains('overlay') || e.target.classList.contains('close-modal')) {
            return closeModal(false);
          } else {
            reply.decision = e.target.textContent;
            return closeModal(true);
          }
        })
      });
    }
  
    function closeModal(continueData = false) {
      //Check if the user justs want to close the modal or if they are done with the form
      if (continueData) {
        //Close modal and make sure reply values are accurate
        // Check if input is even wanted in the modal
        if (sel('.modal-input-elem')) {
          // Now check if cartname is correct?
          reply.cartName = sel('.modal-input-elem').value || sel('.modal-input-elem').placeholder;
        }
      }
      //remove the element from the dom and then return the reply value
      sel('main').removeChild(sel('.modal-popup'));
      resolve(reply);
    }
  });
}

async function getans() {

  let ans = await modal(
    ['Create New Cart', 'create a new cart and replace it'],
    ['confirm', 'cancel'],
    /*{
      shouldRenderInput: true,
      label: 'Name your cart',
      placeholder: 'cart 1'
    }*/
  )
  console.log(ans)
}

