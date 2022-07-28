import { OAuth2 } from "oauth";
import dotenv from "dotenv"
import readline from "readline"

dotenv.config()
const API_KEY = process.env.API_KEY
const API_SECRET = process.env.API_SECRET;

const oauth2 = new OAuth2(
	API_KEY, API_SECRET,
	'https://api.intra.42.fr',
	null,
	'/oauth/token',
	null
);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
});

function getInterval() {
	let date = new Date(Date.now())
	let year = date.getFullYear()
	const isEndMonth = date.getDay() > 26
	let lastMonth = date.getMonth() - isEndMonth
	let start = new Date(lastMonth <= 0 ? year - 1 : year, lastMonth % 12, 27)
	let nextMonth = date.getMonth() + !isEndMonth
	let end = new Date(nextMonth > 12 ? year + 1 : year, nextMonth % 12, 26)
	return {start, end}
}

function getHours(login, callback) {
	let interval = getInterval()
	let params = new URLSearchParams()
	params.set("begin_at", interval.start.toISOString())
	params.set("end_at", interval.end.toISOString())
	let url1 = `https://api.intra.42.fr/v2/users/${login}/locations_stats?${params.toString()}`
	oauth2.getOAuthAccessToken('',
		{'grant_type': 'client_credentials'}, (e, access_token, refresh_token, results) => {
		oauth2.get(url1, access_token, (err, res) => {
			try {
				let ret = JSON.parse(res)
				let _hours = 0;
				let _minutes = 0;
				let _seconds = 0;
				Array.from(Object.entries(ret)).forEach(([_, value], i) => {
					let [hours, minutes, seconds] = value.split(":").map(n => parseFloat(n))
					_hours += hours;
					_minutes += minutes;
					_seconds += seconds;
				})
				_minutes += _seconds / 60; _seconds %= 60;
				_hours += _minutes / 60; _minutes %= 60;
				callback(_hours, _minutes, _seconds)
			} catch (e) {
				console.error(`The user ${login} doesn't exist.`)
			}
		})
		})
}

rl.question("Enter un login/id: ", (login) => {
	rl.close()
	getHours(login, (_h, _m, _s) => console.log(`${parseInt(_h)}h${parseInt(_m)}m`))
})



