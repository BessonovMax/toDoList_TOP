import { createTask } from "./task";
import { printList } from "./dom";

export const Controller = (function () {
  printList();
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    createTask(data);
    printList();
  });
})();
