import React, { h } from "preact"
import PopoverContents from "../injected/PopoverContents"

const Popup: React.FunctionComponent = () => {
	return <div className="popup">
		<div className="header">
			<span>Quick™ GitHub Navbar</span>
		</div>

		<div style={{ minWidth: 375, width: "maxContent", maxHeight: 450, padding: ".5rem" }} className="popup__background">
      <span style={{ marginBottom: ".25rem" }}><PopoverContents /></span>
		</div>
	</div>
}

export default Popup
