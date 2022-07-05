<script context="module">
	
</script>
<script>
	const gather = async (option) => {
		let data = await fetch(`/api/date/${option.date}`).then(res => res.json()).then(body => body.data)
		
		return data
	}

	let date = new Date().toISOString().split('T')[0]
	let promise = gather({
		date
	});
</script>

<div class="flex flex-wrap justify-center">
	<label class="flex rounded shadow">
		<span class="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-500">Date</span>
		<input class="block rounded-none rounded-r border-gray-500 bg-transparent" bind:value={date} type="date" on:change={() => {
			promise = gather({ date }) 
		}} />
	</label>
	<a class="inline-flex items-center px-3 rounded border-2 font-semibold shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" href="/api/date/{date}">
		api
	</a>
</div>
<div class="min-h-[32px]"></div>

{#await promise}
	<div class="w-fit mx-auto font-semibold">...waiting</div>
{:then data}
	<table class="mx-auto">
		<thead>
			<tr class="text-center">
				<td class="p-1 border border-gray-500">No</td>
				<td class="p-1 border border-gray-500">Name</td>
				<td class="p-1 border border-gray-500">Field</td>
			</tr>
		</thead>
		<tbody>
			{#each data as obj, index (`data-${index}`)}
				<tr class="">
					<td class="p-1 border border-gray-500 text-right">{index + 1}</td>
					<td class="p-1 border border-gray-500">
						{obj.personal.beginwith} {obj.personal.firstname} {obj.personal.middlename} {obj.personal.lastname}
					</td>
					<td class="p-1 border border-gray-500">
						{obj.field.type} {obj.field.position} {obj.field.group} {obj.field.place}
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
				</td>
			</tr>
		</tfoot>
	</table>
{/await}
