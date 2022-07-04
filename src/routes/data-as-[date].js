import { gather } from "../lib/datafunctions";

export const get = async ({ params }) => {
	return {
		body: {
			data: await gather({ date: `${params.date}` }),
			params,
		},
	};
};
