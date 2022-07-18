import { PinIcon } from "@primer/octicons-react"
import React, { h, render, Ref } from "preact"
import { useRef, useState } from "preact/hooks"
import { ArrowContainer, Popover } from "react-tiny-popover"
import PopoverContents from "./PopoverContents"

import "./style.scss"

const Injected: React.FunctionComponent = () => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	const clickMeButtonRef = useRef<HTMLButtonElement | undefined>();

	return <span className="position-relative">
		<Popover
			isOpen={isPopoverOpen}
			positions={["bottom"]}
			padding={5}
			onClickOutside={() => setIsPopoverOpen(!isPopoverOpen)}
			ref={clickMeButtonRef as Ref<HTMLElement>}
			containerStyle={{ zIndex: "9999" }}
			content={({ position, childRect, popoverRect }) => (
				<ArrowContainer
					position={position}
					childRect={childRect}
					popoverRect={popoverRect}
					arrowColor={'white'}
					arrowSize={9}
					arrowStyle={{ opacity: 1, transform: "translateY(1px)" }}
					className='popover-arrow-container'
					arrowClassName='popover-arrow'
				>
					<div className="qgnpopover">
						<PopoverContents />
					</div>
				</ArrowContainer>
			)}
		>
			<span className="Header-link cursor-pointer qng__navbar-button" onClick={() => {
				setIsPopoverOpen(!isPopoverOpen)
			}}>
				<PinIcon /><span class="dropdown-caret"></span>
			</span>
		</Popover>
	</span>
}

export default Injected
