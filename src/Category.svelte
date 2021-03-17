<script>
  import { createEventDispatcher } from 'svelte';
  import { get } from 'svelte/store';
  import { transactions } from './stores';
  
  const dispatch = createEventDispatcher();
  
  export let category;
  export let showingTransactions = false;
  export let categoryTransactions = [];
  
  function getCategoryTransactions() {
    let trans = get(transactions);
    categoryTransactions = trans.filter((tran) => tran.category === category.title);
  }
  
  function toggleTransactions() {
    showingTransactions = !showingTransactions;
    
    if (showingTransactions){
      getCategoryTransactions();
    }
  }

  function formattedDate(utc) {
    let [month, date] = new Date(utc).toLocaleDateString("en-US").split("/");
    return `${month}/${date}`;
  }

  function removeTransaction(transaction) {
    transactions.update((all)=>{
      let i = all.findIndex((val) => val.date === transaction.date);
      return all.splice(i, 1);
    })
  }
  
</script>


<li on:click="{toggleTransactions}">  
  <p>{category.title} has <strong>${category.remaining}</strong></p>
  <button on:click|stopPropagation="{() => dispatch('toggleTransaction')}">spend</button>
  
  {#if showingTransactions}
  <ul class="transactions">
    {#each categoryTransactions as transaction} 
    <li>${transaction.amount} at {transaction.vendor} on {formattedDate(transaction.date)}
    <button type="button" on:click="{removeTransaction(transaction)}">(remove)</button>
    </li>
    {/each}
  </ul>
  {/if}
</li>


<style>
  li {
    box-sizing: border-box;
    width: 100%;
    padding: .6em 1em;
    background: rgb(187,246,242);
    background: linear-gradient(180deg, rgba(187,246,242,1) 0%, rgba(228,170,249,1) 100%);
    font-size: 1.25em;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  
  p {
    flex: 1 1 70%;
  }

  button {
    flex: 1 1 30%;
    margin: 0;
    background-color: rgba(0,0,0,.2);
    align-self: center;
    border-radius: 8px;
    border: 1px dotted #fff;
    outline: none;
    color: #fff;
    padding: 10px 20px;
    font-size: 70%;
  }
  
  .transactions {
    flex: 1 1 100%;
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .transactions li {
    background: none;
    font-size: .9rem;
  }

  .transactions button {
    border: none;
    outline: none;
    padding: 2px 5px;
    display: inline;
    flex: none;
    font-size: 90%;
    background: none;
    color: #510d64;
  }

  
</style>