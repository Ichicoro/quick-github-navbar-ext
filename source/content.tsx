// @ts-ignore
import optionsStorage from "./options-storage.js"
import { h, render } from "preact"
import Injected from "./injected"

async function init() {
	const options = await optionsStorage.getAll()

	const header = document.querySelector("header.Header")
	const insertBeforeEl = header?.querySelector("header.Header > *:nth-last-child(3)")
	// const wideElement = header?.querySelector(".Header > .Header-item.Header-item--full") //.width-full

	document.querySelector("#inject_me_ghqa")?.remove()
	const spanContainer = document.createElement("span")
	spanContainer.id = "inject_me_ghqa"
	spanContainer.classList.add("mr-md-3")

	header?.insertBefore(spanContainer, insertBeforeEl!)

	render(<Injected />, spanContainer);

	// const button = document.createElement("button")
	// button.innerText = "Quick"
	// button.classList.add("mr-md-3")

	const color = 'rgb(' + options.colorRed + ', ' + options.colorGreen + ',' + options.colorBlue + ')'
	const text = options.text
	const notice = document.createElement('div')
	notice.innerHTML = text
	document.body.append(notice)
	notice.id = 'text-notice'
	notice.style.border = '2px solid ' + color
	notice.style.color = color
}

init()
