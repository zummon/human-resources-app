import { gather } from '../lib/datafunctions'

export const get = async ({ params }) => {

	return {
		body: { data: gather({ date }) },
	};
};
