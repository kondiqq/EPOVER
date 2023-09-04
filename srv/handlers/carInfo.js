const http = require('https');
require(`dotenv`).config();

function getCarModelInfo(req) {
    const options = {
        method: 'GET',
        hostname: 'car-data.p.rapidapi.com',
        port: null,
        path: `/cars?limit=10&page=0&make=${req.data.make}
        &model=${req.data.model}`,
	headers: {
		'X-RapidAPI-Key': `${process.env.XCARKEY}`,
		'X-RapidAPI-Host': `${process.env.XCARHOST}`
	}
};

const request = http.request(options, function (res) {
	const chunks = [];

	res.on('data', function (chunk) {
		chunks.push(chunk);
	});

	res.on('end', function () {
		const body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();
}

module.exports = {getCarModelInfo};