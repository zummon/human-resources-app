<script>

	let store = []
  	let person = {}

		export const gather = async (option) => {
	let data = database.slice();

	if (typeof option === "object") {
		if (option.date) {
			data;
		} else if (option.id) {
			let obj = data.find((person) => person.id === option.id);
			obj = {
				...obj,
				personal: obj.personal.sort((a, b) =>
					a.applydate < b.applydate ? -1 : a.applydate > b.applydate ? 1 : 0
				),
				field: obj.field.sort((a, b) =>
					a.applydate < b.applydate ? -1 : a.applydate > b.applydate ? 1 : 0
				),
				knowledge: obj.knowledge.sort((a, b) =>
					a.graddate < b.graddate ? -1 : a.graddate > b.graddate ? 1 : 0
				),
			};

			return obj;
		}
	}

	return data;
};
</script>

<button class="inline-flex items-center px-3 rounded border-2 font-semibold shadow focus:border-orange-500 hover:border-orange-500 focus:text-orange-500 hover:text-orange-500" on:click={() => {
  promise = gather({ date }) 
}}>
  Load
</button>



{#await promise}
	<p>...waiting</p>
{:then data}
	<table class="border-b border-gray-500 mx-auto">
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