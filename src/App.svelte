<script>
	import { appPrefix, categories } from './stores';
	import Category from './Category.svelte';
	import Transaction from './Transaction.svelte';

	export let name = "Winston's goddamn budget";
	export let addingTransaction = false;
	export let activeCategory = '';

	function toggleTransaction() {
    addingTransaction = !addingTransaction;
  }

	function totalAvailable() {
		let budget = 0;
		$categories.forEach((category) => {
			return budget += category.allocated;
		});

		return budget;
	}

	function startBudget() {
		localStorage.removeItem(`${appPrefix}categories`);
		categories.update(val => []);
	}

</script>

<main>
	<h1>the goddamn budget</h1>
	<p>You have ${totalAvailable()}.</p>
	
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
	<button on:click={startBudget}>Reset</button>
</main>

<style>
	* {
  	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
		box-sizing: border-box;
	}

	main {
		padding: 0;
		width: 100%;
		margin: 0 auto;
		padding: 0;
	}

	h1 {
		font-size: 2em;
		font-weight: 100;
		padding: 0;
		margin: .5em 0;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

</style>