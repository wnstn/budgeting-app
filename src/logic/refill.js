import { categories } from './stores';
import { budget } from './config';

export function refillBudgets() {

  categories.update((cats) => {

    return cats.map((cat) => {
      let config = budget.categories.find((c) => c.title === cat.title);

      if (config) {
        cat.remaining += config.allocated;
      }
      return cat;
    })
  })

}