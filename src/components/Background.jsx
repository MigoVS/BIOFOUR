import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
	const blobRefs = useRef([])
	const animationRef = useRef()
	const lastScrollTime = useRef(0)
	
	const initialPositions = [
		{ x: -16, y: 0 },
		{ x: -16, y: 0 },
		{ x: 80, y: -32 },
		{ x: 80, y: -32 },
	]

	useEffect(() => {
		let isAnimating = true

		const animate = (currentTime) => {
			if (!isAnimating) return
			
			// Throttle animation to 60fps max
			if (currentTime - lastScrollTime.current < 16) {
				animationRef.current = requestAnimationFrame(animate)
				return
			}
			
			lastScrollTime.current = currentTime
			const scrollY = window.pageYOffset
			const time = currentTime * 0.001 // Convert to seconds for smoother animation

			blobRefs.current.forEach((blob, index) => {
				if (!blob) return
				
				const initialPos = initialPositions[index]
				const speed = 0.5 + index * 0.2 // Different speeds for each blob
				
				// Smooth sinusoidal movement with scroll influence
				const xOffset = Math.sin(time * speed + scrollY * 0.001 + index * 1.2) * 100
				const yOffset = Math.cos(time * speed * 0.8 + scrollY * 0.002 + index * 0.8) * 60
				
				// Add gentle scroll-based drift
				const scrollInfluence = scrollY * 0.1
				
				const x = initialPos.x + xOffset + Math.sin(scrollY * 0.003) * 20
				const y = initialPos.y + yOffset + scrollInfluence * 0.2
				
				// Use transform3d for hardware acceleration
				blob.style.transform = `translate3d(${x}px, ${y}px, 0)`
			})

			animationRef.current = requestAnimationFrame(animate)
		}

		// Start animation
		animationRef.current = requestAnimationFrame(animate)

		return () => {
			isAnimating = false
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current)
			}
		}
	}, [])

	return (
		<div className="fixed inset-0 pointer-events-none">
			<div className="absolute inset-0 overflow-hidden">
				{/* Purple blob - top left */}
				<div
					ref={(ref) => (blobRefs.current[0] = ref)}
					className="absolute top-0 -left-4 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 will-change-transform"
				/>
				
				{/* Cyan blob - top right */}
				<div
					ref={(ref) => (blobRefs.current[1] = ref)}
					className="absolute top-0 -right-4 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-bl from-cyan-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-25 hidden sm:block will-change-transform"
				/>
				
				{/* Blue blob - bottom left */}
				<div
					ref={(ref) => (blobRefs.current[2] = ref)}
					className="absolute -bottom-8 left-[-20%] md:left-20 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-tr from-blue-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-25 will-change-transform"
				/>
				
				{/* Blue blob - bottom right */}
				<div
					ref={(ref) => (blobRefs.current[3] = ref)}
					className="absolute -bottom-10 right-20 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tl from-blue-300 to-purple-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 hidden sm:block will-change-transform"
				/>
			</div>
			
			{/* Grid overlay with subtle animation */}
			<div 
				className="absolute inset-0 opacity-60"
				style={{
					backgroundImage: `
						linear-gradient(to right, rgba(79, 79, 79, 0.08) 1px, transparent 1px),
						linear-gradient(to bottom, rgba(79, 79, 79, 0.08) 1px, transparent 1px)
					`,
					backgroundSize: '32px 32px',
				}}
			/>
		</div>
	)
}

export default AnimatedBackground