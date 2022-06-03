<script context="module">
	
</script>
<script>
	const gather = async ({ date }) => {
		const res = await fetch(`https://raw.githubusercontent.com/zummon/hr-data/main/base.json`);
		const json = await res.json();
		let data = json.slice()

		if (date){ 
			data = data.map((person) => {
				let showname = 
				person.name.reduce((prev, cur, index, all) => {
					if (cur.applydate <= date){
						return {...prev, ...cur}
					}
					return prev
				}, {})
				return {...person, name: showname}
			})
		}

		return data;
	}

	let date = new Date().toISOString().split('T')[0]
	let promise = gather();

</script>

<input bind:value={date} />
<button on:click={() => promise = gather({date})}>
	generate
</button>
<button on:click={() => date = ''}>
	clear
</button>

{#await promise}
	<p>...waiting</p>
{:then data}
	<p>{JSON.stringify(data)}</p>
{/await}
