import { sel } from './util/methods.js';

fetch('./scripts/JSON/prices.json')
  .then(res => res.json())
  .then(data => populateDataList(data))
  .catch(error => console.log(error));
function populateDataList(data) {
  let dl_elem = sel('datalist#itemlist');
  data.forEach(el => {
    let optionElem = document.createElement("option");
    optionElem.value = el.name;
    optionElem.textContent = el.name;
    dl_elem.append(optionElem);
  });
}