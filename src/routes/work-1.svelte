<script context="module">
	
</script>
<script>
	const gather = async (option) => {
		let data = option.id ? 
		await fetch(`/api/id/${option.id}`).then(res => res.json()).then(body => body.data) : 
		await fetch(`/api/date/${option.date}`).then(res => res.json()).then(body => body.data)
		
		return data
	};

	let date = new Date().toISOString().split('T')[0]
	let promise = gather({
		date
	});
	let person = {}
</script>

{#await promise}
	<div class="w-fit mx-auto font-semibold">...waiting</div>
{:then data}
	<table class="mx-auto">
		<thead>
			<tr class="text-center">
				<td class="p-1 border border-gray-500">No</td>
				<td class="p-1 border border-gray-500">Name</td>
				<td class="p-1 border border-gray-500">Field</td>
				<td class="p-1 border border-gray-500">Utils</td>
			</tr>
		</thead>
		<tbody>
			{#each data as obj, index (`data-${index}`)}
				<tr class="{obj.id === person.id ? 'font-semibold' : ''}">
					<td class="p-1 border border-gray-500 text-right">{index + 1}</td>
					<td class="p-1 border border-gray-500">
						{obj.personal.beginwith} {obj.personal.firstname} {obj.personal.middlename} {obj.personal.lastname}
					</td>
					<td class="p-1 border border-gray-500">
						{obj.field.type} {obj.field.position} {obj.field.group} {obj.field.place}
					</td>
					<td class="p-1 border border-gray-500">
						<button class="inline-flex items-center px-3 rounded shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" on:click={async () => {
							person = await gather({ id: obj.id })
						}}>
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
							</svg>
						</button>
					</td>
				</tr>
			{:else}
				<tr class="font-semibold">
					<td class="text-center" colspan="99">
						not found...
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr class="text-center">
				<td colspan="99">
					Count: {data.length}
					<button class="inline-flex items-center px-3 rounded border-2 font-semibold shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" on:click={() => {
						//
					}}>
						Add
					</button>
				</td>
			</tr>
		</tfoot>
	</table>
{/await}


{#if person.id}
<div class="w-fit mx-auto">
	<button class="inline-flex items-center px-3 rounded border-2 font-semibold shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" on:click={() => {
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
				<button class="inline-flex items-center px-3 rounded border-2 font-semibold shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" on:click={() => {
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
						<button class="inline-flex items-center px-3 rounded border-2 font-semibold shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" on:click={() => {
							//
						}}>
							Edit
						</button>
					</div>
				{/each}
			</div>
		{/if}
	{/each}
</div>
{/if}