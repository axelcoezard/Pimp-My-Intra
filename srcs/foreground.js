(async function () {
	let toObserv = document.querySelector("#user-locations")

	function getDays(month) {
		return ([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])[month]
	}

	function getExtraDays(month, endDate) {
		return getDays(month) - endDate
	}

	function getDaysCount(start, endDate) {
		let count = start.getDate() % endDate
		if (start.getDate() <= endDate)
			count += getExtraDays(start.getMonth() - 1 % 12, endDate)
		return count
	}

	function getFirstDayPreviousMonth(date) {
		return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
	}

	function getMonthOffset(start, endDate) {
		let offset = 0;
		let today = (new Date()).getMonth()
		while (today > start.getMonth())
		{
			offset += getDays(today)
			today--;
		}
		return offset
	}

	function calculatetLogTime(start, endDate) {
		let count = getDaysCount(start, endDate)
		let offset = getMonthOffset(start, endDate)
		let hours = Array.from(document.querySelectorAll("#user-locations g"))
			.filter((node, i, arr) => {
				console.log(arr.length, count, offset, i)
				return i > arr.length - count
			})
			.reduce((acc, node, i) => {
				let total = node.getAttribute("data-original-title").split("h")
				return acc + parseFloat(total[0]) + parseFloat(total[1]) / 60
			}, 0)
		return [Math.floor(hours), Math.round((hours - Math.floor(hours)) * 60)]
	}

	let observer = new MutationObserver(function(mutations) {
		// vars
		let today = new Date()
		let [hours, minutes] = calculatetLogTime(today, 26)
		let lastMonth = calculatetLogTime(getFirstDayPreviousMonth(today), 26)
		// append to page
		let div = document.createElement("div")
		div.style = "display: flex; flex-direction: row; justify-content: center; align-items: center;gap:15px;"
		let span = document.createElement("span")
		span.style = "color: gray;font-size:1.5rem !important;font-weight:bold!important;"
		span.innerHTML = `${hours} heures et ${minutes} minutes`
		div.append(span)
		let small = document.createElement("small")
		small.style = "color: red;font-size: 1.2rem !important; font-weight: bold !important;"
		small.innerHTML = ` + ${Math.min(70, lastMonth[0])}h bonus`
		div.append(small)

		let divMoi = document.querySelector("body > div.page > div.page-content.page-content-fluid > div > div.align-top > div > div.container-fullsize.full-width.fixed-height > div > div:nth-child(3) > div h4")
		let divPasMoi = document.querySelector("body > div.page > div.page-content.page-content-fluid > div > div.container-fullsize.full-width.fixed-height > div:nth-child(1) > div")
		if (divMoi)	divMoi.append(div)
		else if (divPasMoi) divPasMoi.prepend(div)
	});

	observer.observe(toObserv, {
		attributes:    true,
		childList:     true,
		characterData: true
	});
})()
