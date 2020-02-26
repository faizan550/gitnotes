/** @format */

export const middleWare = (store: any) => (next: any) => (action: any) => {
	console.log(action);
	const actionInfo = action['FETCH_ACTION'];
	const { type, body, verb, headers, endpoint } = actionInfo;

	next({
		type: `${type}_REQUEST`
	});
	fetch(endpoint, {
		method: verb,
		headers: headers,
		body: body
	})
		.then((response) => response.json())
		.then((json) => {
			return next({
				type: `${type}_RESPONSE`,
				payload: json
			});
		})
		.catch((error) => {
			return next({
				type: `${type}_ERROR`,
				payload: error
			});
		});
};