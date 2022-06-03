<script context="module">
	
</script>
<script>
	const now = () => {
		return new Date().toISOString().split('T')[0]
	}
	const compare = ( a, b ) => {
		if ( a.last_nom < b.last_nom ){
			return -1;
		}
		if ( a.last_nom > b.last_nom ){
			return 1;
		}
		return 0;
	}
	const objectsToArray = (objects) => {
		let headers = ['No','Name']
		let array = objects.map((obj,index) => {

			return [
				index + 1, 
				`${obj.name.beginwith} ${obj.name.firstname} ${obj.name.middlename} ${obj.name.lastname}`
			]
		})

		return [headers,...array]
	}
	const gather = async (option) => {
		if (option){

		}
		const res = await fetch(`https://raw.githubusercontent.com/zummon/hr-data/main/base.json`);
		const json = await res.json();
		let data = json.slice();

		if (option && option.date){
			data = data.map((person) => {
				let showname = 
				person.name.sort(compare).reduce((prev, cur, index, all) => {
					if (cur.applydate <= option.date){
						return {...prev, ...cur}
					}
					return prev
				}, {})
				return {...person, name: showname}
			})
		}

		return data;
	}

	let date = now()
	let promise = gather({
		date: now()
	});

</script>

<input bind:value={date} />
<button on:click={() => promise = gather({ date })}>
	generate
</button>

{#await promise}
	<p>...waiting</p>
{:then data}
	<table>
		{#each objectsToArray(data) as d, index (`data-${index}`)}
			<tr>
				<td>{d[0]}</td>
				<td>{d[1]}</td>
			</tr>
		{:else}
			not found...
		{/each}
	</table>
{/await}
