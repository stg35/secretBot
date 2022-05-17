import { MailSlurp } from "mailslurp-client";
import puppeteer from 'puppeteer';
import 'dotenv/config';

const strToArr = (str) => {
	let codeSymbols = [];
	for (let symbol of str) {
		codeSymbols.push(symbol);
	}
	return codeSymbols;
};

const apiKey = process.env.API_KEY;
const mailslurp = new MailSlurp({ apiKey });
const refCode = strToArr(process.env.REF_CODE);

const createInbox = async () => {
	const { id, emailAddress } = await mailslurp.createInbox();
	return {
		id,
		emailAddress
	};
};

const getLastCode = async (id) => {
	const latestEmail = await mailslurp.waitForLatestEmail(id);
	const pattern = '[0-9]{6}';
	return latestEmail.body.match(pattern)[0];
};

// const codeSymbols = ['1', '2', '3', '4', '5', '6'];
// const email = '8137fed6-6842-4c66-8e04-bbb7dec32e05@mailslurp.com';

const scrape = async (emailId, emailAddress, refCode) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setViewport({width: 3000, height: 1000})
	await page.goto('https://app.step.app/');

	await page.waitForSelector('#root > div > div > input');
	await page.type('input[type=email]', emailAddress);
	await page.click('#root > div > div > div.welcome-button');

	await page.waitForNavigation();

	const code = await getLastCode(emailId);
	const codeSymbols = strToArr(code);

	await page.waitForSelector('#root > div > div > div.email-code-input');

	// codeSymbols.map(symbol => page.type(`#root > div > div > div.email-code-input > div:nth-child(${symbol}) > input[value]`, symbol));
	// await Promise.race(codeSymbols);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(1) > input[value]`, codeSymbols[0]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(2) > input[value]`, codeSymbols[1]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(3) > input[value]`, codeSymbols[2]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(4) > input[value]`, codeSymbols[3]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(5) > input[value]`, codeSymbols[4]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(6) > input[value]`, codeSymbols[5]);
	await page.screenshot({path: './waiting?.png'});
	await page.waitForNavigation();

	await page.waitForSelector('#root > div > div > div.email-code-input');
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(1) > input[value]`, refCode[0]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(2) > input[value]`, refCode[1]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(3) > input[value]`, refCode[2]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(4) > input[value]`, refCode[3]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(5) > input[value]`, refCode[4]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(6) > input[value]`, refCode[5]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(7) > input[value]`, refCode[6]);
	await page.type(`#root > div > div > div.email-code-input > div:nth-child(8) > input[value]`, refCode[7]);

	await page.screenshot({path: './screen.png'});

	console.log('yo! new ref code ;)');

	await browser.close();
};

const scrapingFunction = async () => {
	const response = await createInbox();
	await scrape(response.id, response.emailAddress, refCode);
};

scrapingFunction()
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.then(() => scrapingFunction())
	.catch((e) => console.log(e));


// setInterval( async () => {
// 	try {
// 		const response = await createInbox();
// 		await scrape(response.id, response.emailAddress, refCode);
// 	}
// 	catch(e) {
// 		console.log('Noooo!!! Ref code lost ;( ', e);
// 		return 'Oooops...';
// 	}
// }, 0);

// const Inboxes = await mailslurp.getAllInboxes(0,50);
// console.log(Inboxes.content.map(i => [i.id, i.emailAddress]));

// for (let email of emails) {
// 	scrape(email[0], email[1], refCode).catch(e => console.log(e));
// }

// (async () => {
//  	await scrape(emails[2][0], emails[2][1], refCode);
// })().catch(e => console.log(e));