(async function () {



	function getInterval() {
		const date = new Date(Date.now())
		const year = date.getFullYear()
		const isEndMonth = date.getDay() > 26
		const lastMonth = date.getMonth() - isEndMonth
		const start = new Date(lastMonth <= 0 ? year - 1 : year, lastMonth % 12, 27)
		const nextMonth = date.getMonth() + !isEndMonth
		const end = new Date(nextMonth > 12 ? year + 1 : year, nextMonth % 12, Math.min(26, date.getDate()))
		return {start, end}
	}

	function calculatetLogTime() {
		const {start, end} = getInterval()

		const today = (new Date(Date.now())).getTime()
		const time_diff = Math.abs(start.getTime() - today)
		const days_diff = parseInt(time_diff / (1000 * 3600 * 24))
		const hours = Array.from(document.querySelectorAll("#user-locations g"))
			.filter((node, i, arr) => i >= arr.length - days_diff - 1)
			.reduce((acc, node, i) => {
				let total = node.getAttribute("data-original-title").split("h")
				return acc + parseFloat(total[0]) + parseFloat(total[1]) / 60
			}, 0)
		return [Math.floor(hours), Math.round((hours - Math.floor(hours)) * 60)]
	}

	function observer(mutations) {
		// vars
		const [hours, minutes] = calculatetLogTime()
		// append to page
		const div = document.createElement("div")
		div.style = "display: flex; flex-direction: row; justify-content: center; align-items: center;gap:15px;"
		const span = document.createElement("span")
		span.style = "color: gray;font-size:1.5rem !important;font-weight:bold!important;"
		span.innerHTML = `${hours} heures et ${minutes} minutes`
		div.append(span)

		const divMoi = document.querySelector("body > div.page > div.page-content.page-content-fluid > div > div.align-top > div > div.container-fullsize.full-width.fixed-height > div > div:nth-child(3) > div h4")
		const divPasMoi = document.querySelector("body > div.page > div.page-content.page-content-fluid > div > div.container-fullsize.full-width.fixed-height > div:nth-child(1) > div")
		if (divMoi)	divMoi.append(div)
		else if (divPasMoi) divPasMoi.prepend(div)
	}

	let toObserv = document.querySelector("#user-locations")
	new MutationObserver(observer).observe(toObserv, {
		attributes:    true,
		childList:     true,
		characterData: true
	});

	console.log("[Installed] Logtime");
})()
