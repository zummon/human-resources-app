import people from "../lib/database.json";
import model from "../lib/datamodel.json";

export const get = async () => {
	return {
		body: { people, model },
	};
};
