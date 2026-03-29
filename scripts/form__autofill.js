import { sel } from './util/methods.js';

fetch('./scripts/JSON/prices.json')
  .then(res => res.json())
  .then(data => ListenForInput(data))
  .catch(error => console.log(error));

function ListenForInput(data) {
  let inputName = sel('input#name');
  let inputPrice = sel('input#price')
  let inputQty = sel('input#qty')
  inputName && inputName.addEventListener('input', autofill);

  function autofill() {
    console.log(inputName.value)
    data.forEach(el => {
      if (el.name == (inputName.value).toLowerCase()) {
        console.log(el)
        inputPrice.value = el.price;
      }
    });
  }
}