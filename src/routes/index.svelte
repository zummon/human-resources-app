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
					let personal = person.personal.sort(compare).reduce((prev, cur) => {
						if (cur.applydate > option.date){
							return prev
						}
						return {...prev, ...cur}
					}, datamodel.personal[0])

					let field = person.field.sort(compare).reduce((prev, cur) => {
						if (cur.applydate > option.date){
							return prev
						}
						return {...prev, ...cur}
					}, datamodel.field[0])
					
					return {...person, personal, field}
				}).filter((person) => {
					
					return person.field.applydate <= option.date && person.field.position
				})
			} else if (option.id){
				let obj = data.find(person => person.id === option.id)
				obj = {...obj,
					personal: obj.personal.sort(compare),
					field: obj.field.sort(compare),
					knowledge: obj.knowledge //.sort(compare)
				}
				
				return obj
			}
			
		}

		return data;
	}

	let store = []
	let date = now()
	let promise = gather({
		date: now()
	});
	let person = {}

</script>

<input bind:value={date} type='date' />
<button class="border px-3 py-1 font-semibold bg-orange-300" on:click={() => {
	promise = gather({ date }) 
}}>
	Load
</button>

{#await promise}
	<p>...waiting</p>
{:then data}
	<table class="border-b border-t">
		<thead>
			<tr class="text-center border-b">
				<td>No</td>
				<td>Name</td>
				<td>Field</td>
			</tr>
		</thead>
		<tbody>
			{#each data as obj, index (`data-${index}`)}
				<tr class="hover:bg-orange-300 cursor-pointer {obj.id === person.id ? 'font-semibold' : ''}" on:click={async () => {
					person = await gather({ id: obj.id })
				}}>
					<td class="text-center">{index + 1}</td>
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
			<tr>
				<td></td>
				<td>
					<button class="border px-3 py-1 font-semibold bg-orange-300" on:click={() => {
						//
					}}>
						Add
					</button>
				</td>
				<td></td>
			</tr>
		</tbody>
	</table>
{/await}

{#if person.id}

<button class="border px-3 py-1 font-semibold bg-orange-300" on:click={() => {
	person = {}
}}>
	Close
</button>
{#each Object.keys(person) as key, index (`person-${index}`)}
	{#if typeof person[key] === 'string'}
		<div class="flex flex-wrap">
			<div class="">{key}:&nbsp;</div>
			<div class="font-semibold" contenteditable="true" bind:textContent={person[key]}></div>
		</div>
	{:else if Array.isArray(person[key])}
		<div class="mt-4">
			<span class="">{key}</span>:
			<button class="border px-3 py-1 font-semibold bg-orange-300" on:click={() => {
				//
			}}>
				Add
			</button>
			{#each person[key] as atr, ind (`atr-${index}-${ind}`)}
				<div class="flex flex-wrap p-2 border">
					{#each Object.keys(atr) as str, i (`key-${index}-${ind}-${i}`)}
						<div class="">{str}:&nbsp;</div>
						<div class="mr-4 font-semibold" contenteditable="true" bind:textContent={person[key][ind][str]}></div>
					{/each}
					<button class="border px-3 py-1 font-semibold bg-orange-300" on:click={() => {
						//
					}}>
						Edit
					</button>
				</div>
			{/each}
		</div>
	{/if}
{/each}

{/if}