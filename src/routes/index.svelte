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
		if (option){

		}
		const res = await fetch(`/database.json`);
		const json = await res.json();
		let data = json.slice();

		if (option && option.date){
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
			}).filter((person) => person.field.applydate <= option.date && person.field.position)
		}

		return data;
	}
''
	let date = now()
	let promise = gather({
		date: now()
	});

</script>

<input bind:value={date} type='date' />
<button on:click={() => {
	promise = gather({ date }) 
	console.log(date)
}}>
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
				<td>{d[2]}</td>
			</tr>
		{:else}
			not found...
		{/each}
	</table>
{/await}
