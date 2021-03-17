import { writable, readable } from 'svelte/store';

export const appPrefix = 'goddamnBudget_';

const savedCategories = JSON.parse(localStorage.getItem(`${appPrefix}categories`))|| {};
const savedTransactions = JSON.parse(localStorage.getItem(`${appPrefix}transactions`)) || []; 

export const paydates = writable([7, 22]);
export const categories = writable(savedCategories);
export const transactions = writable(savedTransactions);

categories.subscribe(value => {
  let val = value ? value : [];
  console.log('current object', val);
  val = JSON.stringify(val);
  localStorage.setItem(`${appPrefix}categories`, val);
});

function hasCategory(current, title) {
  return current.find(cat => cat && cat.title && cat.title === title);
}

categories.update(val => {
  if (!hasCategory(val, "Groceries")) {
    val.push({
      title: "Groceries",
      allocated: 300,
      remaining: 300
      });
  }

  if (!hasCategory(val, "Blow")) {
    val.push({
      title: "Blow",
      allocated: 57,
      remaining: 57
      });
  }

  if (!hasCategory(val, "Dates")) {
    val.push({
      title: "Dates",
      allocated: 30,
      remaining: 30
      });
  }

  if (!hasCategory(val, "Books")) {
    val.push({
      title: "Books",
      allocated: 20,
      remaining: 20
      });
  }

  if (!hasCategory(val, "Gear")) {
    val.push({
      title: "Gear",
      allocated: 50,
      remaining: 50
      });
  }

  return val;
});
