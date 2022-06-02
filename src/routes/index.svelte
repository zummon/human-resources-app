<script context="module">
	
</script>

<script>
	let promise = getRandomNumber();

	async function getRandomNumber() {
		const res = await fetch(`https://raw.githubusercontent.com/zummon/hr-data/main/base.json`);
		const text = await res.json();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	}

	function handleClick() {
		promise = getRandomNumber();
	}
</script>

<button on:click={handleClick}>
	generate random number
</button>

{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {JSON.stringify(number)}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}