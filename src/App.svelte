<script>
	import { appPrefix, categories } from './stores';
	import Category from './Category.svelte';

	export let currentCategories = [];
	export let name = "Winston's goddamn budget";
	
	let categorySubscription = categories.subscribe(val => currentCategories = val);

	function totalAvailable() {
		let budget = 0;
		currentCategories.map((category) => {
			return budget += category.allocated;
		});

		return budget;
	}

	function startBudget() {
		console.log('budget started');
		localStorage.removeItem(`${appPrefix}categories`);
		categories.update(val => []);
	}

</script>

<main>
	<h1>the goddamn budget</h1>
	<p>You have ${totalAvailable()}.</p>
	<ul>
		{#each currentCategories as category}
			<Category category={category} />
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