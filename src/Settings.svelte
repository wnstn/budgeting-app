<script>
import { slide } from 'svelte/transition';
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

</script>

<section class="settings" transition:slide="{{delay: 0, duration: 300}}">


  <button on:click="{() => dispatch('hideSettings')}">cancel</button>
</section>

<style>
  .settings {
    height: 80vh;
    position: fixed;
    overflow: scroll;
    bottom: 0;
    width: 100vw;
    background: rgb(228,170,249);
    left: 0;
  }
</style>