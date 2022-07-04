import database from "../lib/database.json";
import datamodel from "../lib/datamodel.json";

const compare = (a, b) => {
	if (a.applydate < b.applydate) {
		return -1;
	}
	if (a.applydate > b.applydate) {
		return 1;
	}
	return 0;
};

export const gather = async (option) => {
	let data = database.slice();

	if (typeof option === "object") {
		if (option.date) {
			data = data
				.map((person) => {
					let personal = person.personal.sort(compare).reduce((prev, cur) => {
						if (cur.applydate > option.date) {
							return prev;
						}
						return { ...prev, ...cur };
					}, datamodel.personal[0]);

					let field = person.field.sort(compare).reduce((prev, cur) => {
						if (cur.applydate > option.date) {
							return prev;
						}
						return { ...prev, ...cur };
					}, datamodel.field[0]);

					return { ...person, personal, field };
				})
				.filter((person) => {
					return person.field.applydate <= option.date && person.field.position;
				});
		} else if (option.id) {
			let obj = data.find((person) => person.id === option.id);
			obj = {
				...obj,
				personal: obj.personal.sort(compare),
				field: obj.field.sort(compare),
				knowledge: obj.knowledge, //.sort(compare)
			};

			return obj;
		}
	}

	return data;
};
