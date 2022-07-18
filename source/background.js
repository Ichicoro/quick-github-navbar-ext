// eslint-disable-next-line import/no-unassigned-import
import './options-storage.js';

const handleUpdated = (tabId, changeInfo) => {
	console.log("changed")
	browser.tabs.executeScript({file: "/content.tsx"});
}
browser.tabs.onUpdated.addListener(handleUpdated);
