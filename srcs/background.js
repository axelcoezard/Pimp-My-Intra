(async function() {
	/*chrome.runtime.onInstalled.addListener(async () => {
		const scripts = [{
		  id: 'interceptor',
		  js: ['interceptor.js'],
		  matches: ["https://*.intra.42.fr/*"],
		  runAt: 'document_start',
		  world: 'MAIN',
		}];
		const ids = scripts.map(s => s.id);
		await chrome.scripting.unregisterContentScripts({ids}).catch(() => {});
		await chrome.scripting.registerContentScripts(scripts).catch(() => {});
	});*/
})();
