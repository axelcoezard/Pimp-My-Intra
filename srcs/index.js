(() => {

	chrome.tabs.query({currentWindow: true, active: true}, tabs => {
		// On recupere la tab courante
		const tab = tabs[0];
		// On affiche si on est sur lintra ou non
		if (!tab.url.includes("profile.intra.42.fr"))
			return document.querySelector("#app").append("Pas sur l'intra");
		document.querySelector("#app").append("Sur l'intra");
	});

})()
