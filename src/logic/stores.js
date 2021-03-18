import { writable, readable } from 'svelte/store';
import { payday } from './paydays';
import { create } from './setup';

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

export const paydate = readable(payday, set => {});
export const categories = writable([]);
export const transactions = writable([]);

create();