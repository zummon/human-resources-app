<script context="module">
	
</script>
<script>
	async function gather() {
		const res = await fetch(`https://raw.githubusercontent.com/zummon/hr-data/main/base.json`);
		const json = await res.text();

		return json;
	}
	let date = ''
	let promise = gather();

	function handleClick() {
		promise = gather();
	}
</script>

<input bind:value={date} />
<button on:click={handleClick}>
	generate
</button>

{#await promise}
	<p>...waiting</p>
{:then data}
	<p>
	{
	
		data
		
		}</p>
{/await}
