import { sel } from "./util/methods.js";

let loader = sel('.loader');
document.addEventListener('DOMContentLoaded', () => loader.classList.remove('active'));