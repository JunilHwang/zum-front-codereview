interface Config {
	method: string;
	headers: HeadersInit,
	body?: string
}

const request = async (params) => {
	const {
		url,
		headers = {},
		method,
		body
	} = params;

	const config: Config = {
		method,
		headers: new window.Headers(headers),
	}

	if (body) {
		config.body = JSON.stringify(body);
	}

	return await window.fetch(url, config).then(res => {
		return res.json();
	})
}

const get = async (url: string, headers: HeadersInit) => {
	const response = await request({
		url,
		headers,
		method: 'GET'
	})

	return response
}

export default {
	get
}