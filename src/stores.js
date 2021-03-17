import { writable, get } from 'svelte/store';
import { budget } from './config';

export const appPrefix = 'goddamnBudget_';

// category
// {
//  title: string
//  allocated: readable number
//  remaining: derived number
//  rollover: writeable number
// }

// transaction
// {
//  category: string
//  vendor: string
//  amount: number
//  date: date
// }

export const paydates = writable(budget.paydates);
export const categories = writable([]);
export const transactions = writable([]);

const savedCategories = JSON.parse(localStorage.getItem(`${appPrefix}_categories`)) || [];
const savedTransactions = JSON.parse(localStorage.getItem(`${appPrefix}_transactions`)) || []; 

console.log('instantiating with', savedCategories, savedTransactions);

categories.update(val => {
  budget.categories.forEach((cat) =>{
    const exists = savedCategories.find((saved) => saved.title === cat.title)
    
    if (!exists) {
      console.log("doesn't exist");
      val.push(cat);
    } else {
      console.log('exists');
      val.push(exists);
    }
  });
  
  val = calculateRemaining(savedTransactions, val);
  writeToLocalStorage('categories', val);
  return val;
});

transactions.update(val => {
  return savedTransactions.length > 0 ? savedTransactions : val;
})

categories.subscribe((val) => {
  writeToLocalStorage('categories', val);
});

transactions.subscribe((val) => {
  writeToLocalStorage('transactions', val);
  categories.update(cats => calculateRemaining(val, cats));
})

function calculateRemaining(transactions, cats) {
  let updated = cats.map((cat) => {
    const title = cat.title;
    let local = transactions;
    
    let spent = local.reduce((val, tran)=>{
      if (tran.category === title) {
        return val += tran.amount; 
      }
      return val;
    }, 0);
    console.log('currently spent', spent);
    cat.remaining = cat.allocated - spent;
    
    return cat;
  });
  return updated;
}

function writeToLocalStorage(category, val) {
  val = JSON.stringify(val);
  console.log('writing to LS', `${appPrefix}_${category}`, val);
  localStorage.setItem(`${appPrefix}_${category}`, val);
}