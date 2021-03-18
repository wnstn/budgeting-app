import { categories, transactions, paydate } from './stores';
import { appPrefix, budget } from './config';
import { refillBudgets } from './refill';
import moment from 'moment';

const savedCategories = JSON.parse(localStorage.getItem(`${appPrefix}_categories`)) || [];
const savedTransactions = JSON.parse(localStorage.getItem(`${appPrefix}_transactions`)) || []; 

export function writeToLocalStorage(category, val) {
  val = JSON.stringify(val);
  localStorage.setItem(`${appPrefix}_${category}`, val);
}

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
    cat.remaining = cat.allocated - spent;
    
    return cat;
  });
  return updated;
}

// Get all configured categories and instantiate them.

function createCategories() {

  categories.update(val => {
    budget.categories.forEach((cat) =>{
      const exists = savedCategories.find((saved) => saved.title === cat.title)
      
      if (!exists) {
        val.push(cat);
      } else {
        val.push(exists);
      }
    });
    
    val = calculateRemaining(savedTransactions, val);
    writeToLocalStorage('categories', val);
    return val;
  });

  categories.subscribe((val) => {
    writeToLocalStorage('categories', val);
  });
}

// Get all logged transactions and add them to the app

function createTransactions() {

  transactions.update(val => {
    return savedTransactions.length > 0 ? savedTransactions : val;
  })

  transactions.subscribe((val) => {
    writeToLocalStorage('transactions', val);
    categories.update(cats => calculateRemaining(val, cats));
  })
}

// Determine if we need to add to the budgets because paydate

function setupPaydates() {
  const lastPaycheck = localStorage.getItem(`${appPrefix}_paycheck`) || null;

  paydate.subscribe((payday) => {
    const toSave = {
      lastUpdated: Date.now(),
      upcoming: moment.utc(payday.dates[0])
    };

    // first time app runs
    if (!lastPaycheck) {
      return writeToLocalStorage('paydate', toSave);
    }

    if (lastPaycheck && payday.isToday ) {
      let last = moment(lastPaycheck.lastUpdated);

      // only update the budgets if we haven't already updated today
      if (!payday.dates[0].isSame(last, 'day'))
      // refill every budget!
      refillBudgets();

      return writeToLocalStorage('paydate', {
        lastUpdated: Date.now(),
        upcoming: moment.utc(payday.dates[1])
      });
    }

  });
}

export function create() {
  createCategories();
  createTransactions();
  setupPaydates();
}