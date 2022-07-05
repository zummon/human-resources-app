export const get = async ({ params }) => {
	const { id } = params;
	const datamodel = await import("$lib/datamodel.json").then(
		(xp) => xp.default
	);
	const database = await import("$lib/database.json").then(
		(xp) => xp.default
	);

	let obj = database.find((person) => person.id === id);

	return {
		body: {
			date: new Date().toISOString(),
			data: {
				...datamodel,
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
			},
		},
	};
};
