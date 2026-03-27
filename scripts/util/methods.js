
export let sel = ( selector, all=false, root=document) => {
  return all
    ? root.querySelectorAll(selector)
    : root.querySelector(selector);
}

export const isEmpty = (obj) => Object.keys(obj).length === 0;

//Not needed for now

// /* Goal: checks if items already exist in an array and replaces them. if not adds them*/
// function saveItems(item) {
//   let items = JSON.parse(localStorage.getItem('items')) || [];
//   for (let i = 0; i < items.length; i++) {
//     if (items[i].name == item.name) {
//       items[i] = item;
//     } else {
//       items.push(item);
//     }
//   }
//   // console.log(items)
//   localStorage.setItem('items', JSON.stringify(items))
// }

// console.log(localStorage.getItem('items'))
// localStorage.clear()