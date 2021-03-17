<script>
  import { categories } from './stores';

  export let category;
  export let title = category.title;
  export let allocated = category.allocation;
  export let remaining = category.remaining;
  export let transactions = category.transactions;
  export let spending = false;

  export let label = '';
  export let amount = '';

  function toggleTransaction() {
    spending = !spending;
  }

  function addTransaction() {
    console.log(`adding transaction ${label} with the amount of ${amount}`);

    categories.update(val => {
      let current = val.findIndex(i => i.title === title);
      console.log('current', current);
      if (current === -1) return val;

      console.log(val[current]);
      val[current].transactions.push({
        date: Date.now(),
        label,
        amount
      });

      return val;
    });
  }
</script>

<li class:spending>
  {#if spending}
    <div class="add-transaction">
      <label>where</label>
      <input type="text" bind:value={label} />

      <label>amount</label>
      <input type="number" bind:value={amount} />

      <button on:click={addTransaction}>submit</button>

      <button on:click={toggleTransaction}>cancel</button>
    </div>
  {:else}
  <p>{title} has <strong>${remaining.toString()}</strong></p>
  <button on:click={toggleTransaction}>Spend</button>
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

  .spending {
    height: 360px;
  }

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