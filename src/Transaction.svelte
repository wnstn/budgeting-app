<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  import { transactions } from './stores';

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

<div class="add-transaction">
  <input type="hidden" bind:value={category} />

  <label>where</label>
  <input type="text" bind:value={vendor} />

  <label>amount</label>
  <input type="number" bind:value={amount} />

  <button on:click={addTransaction}>submit</button>

  <button on:click="{() => dispatch('toggleTransaction')}">cancel</button>
</div>

<style>
.add-transaction {
  background: white;
  position: absolute;
  left: 1em;
  right: 1em;
  top: 1em;
  bottom: 1em;
  padding: 1em;
}
</style>