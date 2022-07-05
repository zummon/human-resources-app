export const get = async ({ params }) => {
	const { date } = params;
	const datamodel = await import("../lib/datamodel.json").then(
		(xp) => xp.default
	);
	const database = await import("../lib/database.json").then(
		(xp) => xp.default
	);

	return {
		body: {
			date,
			data: database
				.map((person) => {
					let personal = person.personal
						.sort((a, b) =>
							a.applydate < b.applydate ? -1 : a.applydate > b.applydate ? 1 : 0
						)
						.reduce((prev, cur) => {
							if (cur.applydate > date) {
								return prev;
							}
							return { ...prev, ...cur };
						}, datamodel.personal[0]);

					let field = person.field
						.sort((a, b) =>
							a.applydate < b.applydate ? -1 : a.applydate > b.applydate ? 1 : 0
						)
						.reduce((prev, cur) => {
							if (cur.applydate > date) {
								return prev;
							}
							return { ...prev, ...cur };
						}, datamodel.field[0]);

					return { ...person, personal, field };
				})
				.filter((person) => {
					return person.field.applydate <= date && person.field.position;
				}),
		},
	};
};
