<script>
  import { transactions } from './stores';
  import { fade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  
  export let vendor = '';
  export let amount = '';
  export let category ='';
  
  
  function addTransaction() {
    transactions.update(val => {
      val.push({
        date: Date.now(),
        category,
        vendor,
        amount
      });
      
      return val;
    });
    
    dispatch('toggleTransaction');
  }
</script>

<div class="add-transaction" transition:fade="{{delay: 0, duration: 300}}" on:click="{() => dispatch('toggleTransaction')}">
  <form on:click|stopPropagation>
    <h2>where'd the fuckin money go</h2>
    <input type="hidden" bind:value={category} />
    
    <label for="vendor">where</label>
    <input id="vendor" type="text" bind:value={vendor} />
    
    <label for="value">amount</label>
    <input id="value" type="number" bind:value={amount} />
    
    <div class="controls">
      <button on:click="{() => dispatch('toggleTransaction')}">cancel</button>
    
      <button type="submit" on:click={addTransaction}>submit</button>
    </div>
  </form>
</div>

<style>
  .add-transaction {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
  }

  form {
    background: white;
    background: linear-gradient(0deg, rgba(187,246,242,1) 0%, rgba(228,170,249,1) 100%);
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    height: 100%;
    box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.52);
    position: fixed;
    border-radius: 3px;
    left: 1em;
    right: 1em;
    top: 10vh;
    height: 50vh;
    padding: 1em;
  }

  h2 {
    font-size: 1.2em;
  }

  label,
  input {
    flex: 1 1 100%;
  }

  label {
    margin: 10px 0 5px;
  }

  input {
    margin-bottom: 10px;
  }


  .controls {
    justify-content: space-between;
    display: flex;
    flex: 1 1 100%;
    margin-top: 10px;
  }
  button {
    margin: 0;
    background-color: rgba(0,0,0,.2);
    border-radius: 8px;
    border: 1px dotted #fff;
    outline: none;
    color: #fff;
    padding: 10px 20px;
  }
</style>