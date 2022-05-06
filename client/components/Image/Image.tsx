/** @jsxImportSource @emotion/react */
import React from "react"
import NextImage from "next/image"

function Image(
	{
		className,
		...props
	}: React.ComponentProps<typeof NextImage> & { className?: string },
	ref: React.ForwardedRef<HTMLDivElement>
) {
	return (
		<div className={className} ref={ref}>
			<NextImage {...props}/>
		</div>
	)
}

export default React.forwardRef(Image)
