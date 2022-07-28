(() => {
	let send = XMLHttpRequest.prototype.send;

	//Monkey patch send
	XMLHttpRequest.prototype.send = function () {
		this.addEventListener('load', function (e) {
			console.log("[Request sent]:, ", event.target.responseURL);
		})
		return send.apply(this, arguments);
	}

	console.log("[Installed] Interceptor");
})()

