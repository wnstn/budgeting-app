import { budget } from './config';
import moment from 'moment';

let [first, second] = budget.paydates;
let firstPaycheck = moment().date(first);
let secondPaycheck = moment().date(second);

function determinePaydays() {
  
  if (moment().isSameOrBefore(firstPaycheck)) {
    return [firstPaycheck, secondPaycheck];
  }
  
  if (moment().isSameOrBefore(secondPaycheck)) {
    return [secondPaycheck, firstPaycheck.add(1, 'M')];
  }

  return [firstPaycheck.add(1, 'M'), secondPaycheck.add(1, 'M')]; // must be next month
}

const calculatedPayday = determinePaydays();

export const payday = {
  isToday: moment().isSame(calculatedPayday[0], 'day'),
  dates: calculatedPayday,
  daysRemaining: moment().from(calculatedPayday[0], true),
}