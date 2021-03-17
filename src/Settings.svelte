<script>
import { appPrefix, categories } from './stores';
import { slide } from 'svelte/transition';
import { createEventDispatcher, onDestroy } from 'svelte';
const dispatch = createEventDispatcher();

export let confirming = false;
export let actionMethod = null;

function restartBudget() {
  localStorage.removeItem(`${appPrefix}_categories`);
  localStorage.removeItem(`${appPrefix}_transactions`);
}

onDestroy(() => {
  confirming = false;
  actionMethod = null;
})

</script>

<section class="settings" transition:slide="{{delay: 0, duration: 300}}">

  <div class="top-section">
    <div class="danger" transition:slide="{{delay: 0, duration: 300}}">
      <button type="button" on:click="{() => {
        if (!confirming) {
          actionMethod = restartBudget;
          confirming = 'Click here to Reset all Data';
        } else {
          actionMethod = null;
          confirming = false;
        }
        }}">Reset App</button>
      <button type="button">Start next pay period</button>
  </div>
  {#if confirming}
    <div class="confirmation">
      <button class="strong" on:click="{() => {
        actionMethod();
        actionMethod = null;
        confirming = false;
      }}"><strong>{confirming}</strong></button>
    </div>
  {/if}

  <h2>Categories</h2>
  <ul>
    {#each $categories as category}
      <li>
        {category.title} has ${category.allocated} per pay period.
      </li>
    {/each}
  </ul>
  </div>


  <div class="bottom-section">
    <button on:click="{() => dispatch('hideSettings')}">close</button>
  </div>
</section>

<style>
  .settings {
    height: 80vh;
    position: fixed;
    overflow: scroll;
    bottom: 0;
    width: 100vw;
    background: #222;
    left: 0;
    padding: 8px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
  }
  button {
    margin: 0;
    border-radius: 4px;
    padding: 5px 10px;
    background: transparent;
    color: white;
    align-self: center;
  }

  .top-section {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }

  h2 {
    color: #e1aff8;
  }

  ul {
    display: flex;
    flex: 1 1 100%;
    color: #fff;
    flex-wrap: wrap;
    list-style: circle;
    margin: 0;
  }

  li {
    font-size: 1.1em;
    margin: 5px 0;
  }

  .bottom-section {
    display: flex;
    width: 100%;
  }

  .danger {
    justify-content: space-evenly;
    width: 100%;
    margin: 1em 0;
    display: flex;
    flex: 1 1 100%;
  }

  .confirmation {
    display: flex;
    flex: 1 1 100%;
    margin: .5em;
    justify-content: center;
  }
  .confirmation button{
    color: orange;
    border: 2px solid orange;
    text-transform: uppercase;
  }
</style>