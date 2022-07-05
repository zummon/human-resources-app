export const get = async () => {
	const datamodel = await import("$lib/datamodel.json").then(
		(xp) => xp.default
	);
	const database = await import("$lib/database.json").then((xp) => xp.default);
	return {
		body: {
			date: new Date().toISOString(),
			data: database.map((person) => {
				return { ...datamodel, ...person };
			}),
		},
	};
};
