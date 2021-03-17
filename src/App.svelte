<script>
  import { categories } from './stores';
  import Category from './Category.svelte';
  import Transaction from './Transaction.svelte';
  import Footer from './Footer.svelte';
  
  export let name = "Winston's goddamn budget";
  export let addingTransaction = false;
  export let activeCategory = '';
  export let totalAvailable = 0;
  
  function toggleTransaction() {
    addingTransaction = !addingTransaction;
  }
  
  categories.subscribe((val) => {
    let budget = 0;
    val.forEach((category) => {
      return budget += category.remaining;
    });
    
    totalAvailable = budget;
  });
  
</script>

<main>
  <header>
    <h1>the goddamn budget</h1>
    <p class="help">your account has ${totalAvailable} in it.</p>
  </header>
  
  {#if addingTransaction}
    <Transaction category={activeCategory} on:toggleTransaction={toggleTransaction}/>
  {/if}
  
  <ul>
    {#each $categories as category}
    <Category category={category} on:toggleTransaction={()=> {
      toggleTransaction();
      activeCategory = category.title;
    }} />
    {/each}
  </ul>

  <Footer />
  
</main>

<style>
  main {
    padding: 0;
    width: 100%;
    margin: 0 auto;
    padding: 0;
  }

  header {
    padding: 8px;
  }
  
  h1 {
    font-size: 2em;
    font-weight: 100;
    padding: 0;
    margin: .5em 0 .2em;
  }

  .help {
    margin: .3em 0;
    font-size: .7em;
  }
  
  ul {
    list-style: none;
    margin: 0;
    margin-bottom: 30vh;
    padding: 0;
  }
  
</style>