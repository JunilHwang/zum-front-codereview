import express from "express";
import ranking from './contents/ranking'
import { contents } from "./contents/contents";
import puppeteer from "puppeteer";
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
	res.send('good')
})

app.get('/best', (req, res) => {
	res.send(ranking)
})

app.get('/content/:category', (req, res) => {
	const category = req.params.category as keyof typeof contents;
	if (contents[category]) {
		res.send(contents[category])
	} else {
		res.send('request wrong content')
	}
})

app.get('/content/:category/:idx', (req, res) => {
	const category = req.params.category as keyof typeof contents;
	const idx: number = parseInt(req.params.idx);
	let content;

	if (contents[category]) {
		content = contents[category].find(cnt => {
			return cnt.idx === idx;
		})
	}

	if (req.params.category === 'favorite' || req.params.category === 'best') {
		let key: keyof typeof contents;
		for (key in contents) {
			if (content) break;
			content = contents[key].find(cnt => cnt.idx === idx)
		}
	}


	if (content) {
		(async () => {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.goto(content.url);
			const data = await page.$eval('.article', ele => {
				return ele.outerHTML
			})
			await browser.close();
			res.send(JSON.stringify(data));
		})();
	} else {
		res.send('request wrong content')
	}
})

app.listen(3000, () => {
	console.log('listening...');
})