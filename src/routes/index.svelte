<script context="module">
	
</script>
<script>
	import { gather } from '../lib/datafunctions'

	const now = () => {
		return new Date().toISOString().split('T')[0]
	}

	let date = now()
	let promise = gather({
		date: now()
	});
</script>

<div class="flex flex-wrap justify-center print:hidden">
	<a class="inline-flex items-center px-3 rounded border-2 font-semibold shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" href="work-1">Work 1</a>
</div>
<div class="min-h-[32px]"></div>
<div class="flex flex-wrap justify-center">
	<label class="flex rounded shadow">
		<span class="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-500">Date</span>
		<input class="block rounded-none rounded-r border-gray-500 bg-transparent" bind:value={date} type="date" on:change={() => {
			promise = gather({ date }) 
		}} />
	</label>
	
		<a class="inline-flex items-center px-3 rounded border-2 font-semibold shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" href="data-as-{date}">
			api
		</a>
	
</div>
<div class="min-h-[32px]"></div>

{#await promise}
	<div class="w-fit mx-auto font-semibold">...waiting</div>
{:then data}
	<table class="table-auto mx-auto">
		<thead>
			<tr class="text-center">
				<td class="p-1 border border-gray-500">No</td>
				<td class="p-1 border border-gray-500">Name</td>
				<td class="p-1 border border-gray-500">Field</td>
				<td class="p-1 border border-gray-500 print:hidden">Utils</td>
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
					<td class="p-1 border border-gray-500 print:hidden">
						<button class="inline-flex items-center px-3 rounded shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
								<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
							</svg>
						</button>
					</td>
				</tr>
			{:else}
				<tr class="font-semibold">
					<td class="" colspan="99">
						not found...
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/await}
