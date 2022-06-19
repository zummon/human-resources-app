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
	
	const gather = async (option) => {
		
		const datamodel = await fetch(`/datamodel.json`).then(res => res.json());
		const database = await fetch(`/database.json`).then(res => res.json());
		let data = database.slice();

		if (typeof option === 'object'){
			if (option.date){
				data = data.map((person) => {
					let showname = person.personal.sort(compare).reduce((prev, cur) => {
						if (cur.applydate > option.date){
							return prev
						}
						return {...prev, ...cur}
					}, datamodel.personal[0])

					let showfield = person.field.sort(compare).reduce((prev, cur) => {
						if (cur.applydate > option.date){
							return prev
						}
						return {...prev, ...cur}
					}, datamodel.field[0])
					
					return {...person, personal: showname, field: showfield}
				}).filter((person) => {
					
					return person.field.applydate <= option.date && person.field.position
				})
			} else if (option.id){
				
				return data.find(person => person.id === option.id)
			}
			
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
	Load
</button>

<hr>

{#await promise}
	<p>...waiting</p>
{:then data}
	<table>
		<thead>
			<tr>
				<th>No</th>
				<th>Name</th>
				<th>Field</th>
			</tr>
		</thead>
		<tbody>
			{#each data as obj, index (`data-${index}`)}
				<tr on:click={async () => {
					person = await gather({ id: obj.id })
				}}>
					<td>{index + 1}</td>
					<td>
						{obj.personal.beginwith} {obj.personal.firstname} {obj.personal.middlename} {obj.personal.lastname}
					</td>
					<td>
						{obj.field.type} {obj.field.position} {obj.field.group} {obj.field.place}
					</td>
				</tr>
			{:else}
				not found...
			{/each}
		</tbody>
	</table>
{/await}

<hr>

{#each Object.keys(person) as key, index (`person-${index}`)}
	{#if typeof person[key] === 'string'}
		<div style="display: flex; flex-wrap: wrap">
			<div><b>{key}</b>:&nbsp;</div>
			<div style="padding: 4px" contenteditable="true" bind:textContent={person[key]}></div>
		</div>
	{:else if Array.isArray(person[key])}
		<div style="margin: 8px 0 0 0">
			<b>{key}</b>:
			{#each person[key] as atr, ind (`atr-${index}-${ind}`)}
				<div style="display: flex; flex-wrap: wrap; padding: 4px; border: 1px solid">
					{#each Object.keys(atr) as str, i (`key-${index}-${ind}-${i}`)}
						<div><i>{str}</i>:&nbsp;</div>
						<div style="margin: 0 8px 0 0; font-weight: 700" contenteditable="true" bind:textContent={person[key][ind][str]}></div>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
{/each}