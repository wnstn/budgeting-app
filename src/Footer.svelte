<script>
  import Settings from './Settings.svelte';
  export let showSettings = false;
</script>

<footer>
  <button type="button" on:click="{() => showSettings = !showSettings}">Setup</button>

  <p>8 days until payday.</p>


  {#if showSettings}
    <Settings on:hideSettings="{() => showSettings = !showSettings}"/>
  {/if}
</footer>

<style>
  footer {
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 7vh;
    background: black;
    z-index: 1000;
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding: 8px;
    font-size: .8em;
  }

  button {
    margin: 0;
    border-radius: 4px;
    padding: 5px 10px;
    background: transparent;
    color: white;
    align-self: center;
  }

  p {
    margin: 0;
    margin-right: 16px;
    color: #ccc;
    align-self: center;
  }
</style>