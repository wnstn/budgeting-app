<script>
  import { createEventDispatcher } from 'svelte';
  import { get } from 'svelte/store';
  import { transactions } from './stores';
  
  const dispatch = createEventDispatcher();
  
  export let category;
  export let showingTransactions = false;
  export let categoryTransactions = [];
  
  console.log(category);
  
  function getCategoryTransactions() {
    let trans = get(transactions);
    console.log(trans);
    categoryTransactions = trans.filter((tran) => tran.category = category.title);
  }
  
  function toggleTransactions() {
    showingTransactions = !showingTransactions;
    
    if (showingTransactions){
      getCategoryTransactions();
    }
  }
  
</script>


<li on:click="{toggleTransactions}">  
  <p>{category.title} has <strong>${category.remaining}</strong></p>
  <button on:click|stopPropagation="{() => dispatch('toggleTransaction')}">Spend</button>
  
  {#if showingTransactions}
  <ul class="transactions">
    {#each categoryTransactions as transaction} 
    <li>{transaction.vendor}</li>
    {/each}
  </ul>
  {/if}
</li>


<style>
  li {
    box-sizing: border-box;
    width: 100%;
    padding: 1.2em 1em;
    background: rgb(187,246,242);
    background: linear-gradient(180deg, rgba(187,246,242,1) 0%, rgba(228,170,249,1) 100%);
    font-size: 1.25em;
    display: flex;
    justify-content: space-between;
  }
  
  button {
    margin: 0;
    background-color: rgba(0,0,0,.3);
    align-self: center;
    border-radius: 8px;
    outline: none;
    color: #fff;
    padding: 10px 20px;
  }
  
  
  
</style>