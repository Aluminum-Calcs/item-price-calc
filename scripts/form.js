import { sel } from './util/methods.js';
import decideAction from './cart.js';

// GLOBAL VARIABLES -------------
///////////////////////////////////

// FORM ELEMENTS ----------------
let name_field = sel('.name.group');
let qty_field = sel('.qty.group');
let price_field = sel('.price.group');

let elin = sel('#name');
let price = sel('#price');
let qt = sel('#qty');

let elin_error = sel('.name > .error-m');
let price_error = sel('.price > .error-m');
let qt_error = sel('.qty > .error-m');

// BOOLEAN DECIDERS ------------
let isNameCorrect = !elin.value?false:true;
let isPriceCorrect = !price.value?false:true;
let isQtyCorrect = !qt.value?false:true;

// LISTENERS -------------------
elin.addEventListener('keyup', ()=>{
  check_error('name');
});
price.addEventListener('keyup', ()=>{
  check_error('price');
});
qt.addEventListener('keyup', ()=>{
  check_error('qty');
});

// BUTTONS ---------------------
let btns = sel('form>.links>button',true);
btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    checkInputs(btn.textContent);
  });
})

// Functions -------------------
function checkInputs(btn_action) { // And gather item data
  if (isNameCorrect && isPriceCorrect && isQtyCorrect) {
    // Create item object
    let item = {
      name: elin.value,
      price: price.value,
      qt: qt.value
    };
    // get specific action value
    (btn_action == 'Add')? decideAction(item, 'add'): decideAction(item, 'new');
    check_error('none');
  } else { check_error('all') }
}

function check_error(type = null) {
  if (type == 'name') {
    if (!elin.value || elin.value == ' ') {
      name_field.classList.add('error');
      elin_error.textContent = 'Empty?';
    } else {
      if (elin.value.length < 2) {
        name_field.classList.add('error');
        elin_error.textContent = 'No item\'s name\'s that short';
      } else {
        name_field.classList.remove('error');
        elin_error.textContent = '';
        isNameCorrect = true;
      }
    }
  } else if (type == 'price') {
    if (!price.value || price.value == null || price.value < 1) {
      price_field.classList.add('error');
      price_error.textContent = 'Empty?';
    } else {
      if (price.value < 100) {
        price_field.classList.add('error');
        price_error.textContent = 'That\'s too small';
      } else {
        price_field.classList.remove('error');
        price_error.textContent = '';
        isPriceCorrect = true;
      }
    }
  } else if (type == 'qty') {
    if (!qt.value || qt.value == 0 || qt.value < 1) {
      qty_field.classList.add('error');
      qt_error.textContent = '< 1?';
    } else {
      qty_field.classList.remove('error');
      qt_error.textContent = '';
      isQtyCorrect = true;
    }
  } else if (type == 'all') {
    name_field.classList.add('error');
    elin_error.textContent = 'Empty?';
    
    price_field.classList.add('error');
    price_error.textContent = 'Empty?';
    
    qty_field.classList.add('error');
    qt_error.textContent = '< 1?';
  } else if (type == 'none') {
    name_field.classList.remove('error');
    elin_error.textContent = '';
    
    price_field.classList.remove('error');
    price_error.textContent = '';
    
    qty_field.classList.remove('error');
    qt_error.textContent = '';
    isNameCorrect, isPriceCorrect, isQtyCorrect = true;
  }
}