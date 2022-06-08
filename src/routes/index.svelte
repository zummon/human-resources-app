<script context="module">
	
</script>
<script>
	const now = () => {
		return new Date().toISOString().split('T')[0]
	}
	const compare = ( a, b ) => {
		if ( a.applydate < b.applydate ){
			return -1;
		}
		if ( a.applydate > b.applydate ){
			return 1;
		}
		return 0;
	}
	const objectsToArray = (objects) => {
		let headers = ['No','Name','Field']
		let array = objects.map((obj,index) => {

			return [
				index + 1, 
				`${obj.name.beginwith} ${obj.name.firstname} ${obj.name.middlename} ${obj.name.lastname}`,
				`${obj.field.type} ${obj.field.position} ${obj.field.group} ${obj.field.place}`
			]
		})

		return [headers,...array]
	}
	const gather = async (option) => {
		
		const res = await fetch(`/database.json`);
		const json = await res.json();
		let data = json.slice();

		if (typeof option === 'object'){
			if (option.date){
				data = data.map((person) => {
					let showname = person.name.sort(compare).reduce((prev, cur) => {
						if (cur.applydate > option.date){
							return prev
						}
						return {...prev, ...cur}
					}, {})

					let showfield = person.field.sort(compare).reduce((prev, cur) => {
						if (cur.applydate > option.date){
							return prev
						}
						return {...prev, ...cur}
					}, {})
					
					return {...person, name: showname, field: showfield}
				}).filter((person) => {
					return person.field.applydate <= option.date && person.field.position
				})
			}
			
		} else if (typeof option === 'number') {
			return data[option]
		}

		return data;
	}

	let date = now()
	let promise = gather({
		date: now()
	});
	let person = {}

</script>

<input bind:value={date} type='date' />
<button on:click={() => {
	promise = gather({ date }) 
}}>
	generate
</button>

<hr>

{#await promise}
	<p>...waiting</p>
{:then data}
	<table>
		{#each objectsToArray(data) as d, index (`data-${index}`)}
			<tr on:click={async () => {
				person = await gather(index-1)
				console.log(index,person)
			}}>
				<td>{d[0]}</td>
				<td>{d[1]}</td>
				<td>{d[2]}</td>
			</tr>
		{:else}
			not found...
		{/each}
	</table>
{/await}

<hr>

{#each Object.keys(person) as key, index (`person-${index}`)}
	{#if typeof person[key] === 'string'}
		{key}: <span contenteditable="true">{person[key]}</span><br>
	{:else if Array.isArray(person[key])}
		{#each person[key] as atr, inde (`atr-${index}-${inde}`)}
			{key}:
			{#each Object.keys(atr) as str, i (`key-${index}-${inde}-${i}`)}
				&nbsp;<span contenteditable="true">{person[key][inde][str]}</span>
			{/each}
			<br>
		{/each}
	{/if}
{/each}