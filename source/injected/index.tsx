import React, { h, render, Ref } from "preact"
import { useRef, useState } from "preact/hooks"
import { usePopper } from "react-popper"
import { ArrowContainer, Popover } from "react-tiny-popover"

import "./style.scss"

const Injected: React.FunctionComponent = () => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)
	const clickMeButtonRef = useRef<HTMLButtonElement | undefined>();

	return <span className="position-relative">


		<Popover
			isOpen={isPopoverOpen}
			positions={["bottom"]}
			padding={10}
			onClickOutside={() => setIsPopoverOpen(false)}
			ref={clickMeButtonRef as Ref<HTMLElement>} // if you'd like a ref to your popover's child, you can grab one here
			content={({ position, childRect, popoverRect }) => (
				<ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
					position={position}
					childRect={childRect}
					popoverRect={popoverRect}
					arrowColor={'white'}
					arrowSize={10}
					arrowStyle={{ opacity: 1 }}
					className='popover-arrow-container'
					arrowClassName='popover-arrow'
				>
					<div
						onClick={() => setIsPopoverOpen(!isPopoverOpen)}
						className="qgn-popover"
					>
						Hi! I'm popover content. Here's my position: {position}.
					</div>
				</ArrowContainer>
			)}
		>
			<button type="button" onClick={() => {
				setIsPopoverOpen(true)
			}}>testerino</button>
		</Popover>
	</span>
}

export default Injected
