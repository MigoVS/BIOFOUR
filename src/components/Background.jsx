import React, { useEffect, useRef, useCallback } from "react"

const AnimatedBackground = () => {
	const blobRefs = useRef([])
	const animationRef = useRef()
	const scrollY = useRef(0)
	const isAnimating = useRef(true)
	
	const initialPositions = [
		{ x: -16, y: 0 },
		{ x: -16, y: 0 },
		{ x: 80, y: -32 },
		{ x: 80, y: -32 },
	]

	// Smooth scroll tracking with requestAnimationFrame
	const updateScrollPosition = useCallback(() => {
		scrollY.current = window.pageYOffset
	}, [])

	useEffect(() => {
		// Set up smooth scroll tracking
		let ticking = false
		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					updateScrollPosition()
					ticking = false
				})
				ticking = true
			}
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [updateScrollPosition])

	useEffect(() => {
		isAnimating.current = true
		let startTime = performance.now()

		const animate = (currentTime) => {
			if (!isAnimating.current) return

			// Calculate elapsed time for consistent animation speed
			const elapsed = (currentTime - startTime) * 0.001 // Convert to seconds
			const currentScroll = scrollY.current

			blobRefs.current.forEach((blob, index) => {
				if (!blob) return

				const initialPos = initialPositions[index]
				
				// Different animation parameters for each blob
				const speeds = [0.3, 0.4, 0.5, 0.6]
				const amplitudes = [80, 90, 100, 70]
				const phases = [0, 1.2, 2.4, 3.6]
				
				const speed = speeds[index]
				const amplitude = amplitudes[index]
				const phase = phases[index]

				// Smooth sinusoidal movement
				const xOffset = Math.sin(elapsed * speed + phase) * amplitude
				const yOffset = Math.cos(elapsed * speed * 0.7 + phase * 0.8) * (amplitude * 0.6)

				// Gentle scroll influence with damping
				const scrollInfluenceX = Math.sin(currentScroll * 0.002 + phase) * 15
				const scrollInfluenceY = currentScroll * 0.05 * (0.5 + index * 0.1)

				// Calculate final positions
				const x = initialPos.x + xOffset + scrollInfluenceX
				const y = initialPos.y + yOffset + scrollInfluenceY

				// Use transform3d for hardware acceleration and subpixel rendering
				blob.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
			})

			animationRef.current = requestAnimationFrame(animate)
		}

		// Start animation
		animationRef.current = requestAnimationFrame(animate)

		return () => {
			isAnimating.current = false
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
					style={{ backfaceVisibility: 'hidden' }}
				/>
				
				{/* Cyan blob - top right */}
				<div
					ref={(ref) => (blobRefs.current[1] = ref)}
					className="absolute top-0 -right-4 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-bl from-cyan-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-25 hidden sm:block will-change-transform"
					style={{ backfaceVisibility: 'hidden' }}
				/>
				
				{/* Blue blob - bottom left */}
				<div
					ref={(ref) => (blobRefs.current[2] = ref)}
					className="absolute -bottom-8 left-[-20%] md:left-20 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-tr from-blue-400 to-indigo-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-25 will-change-transform"
					style={{ backfaceVisibility: 'hidden' }}
				/>
				
				{/* Blue blob - bottom right */}
				<div
					ref={(ref) => (blobRefs.current[3] = ref)}
					className="absolute -bottom-10 right-20 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tl from-blue-300 to-purple-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-20 hidden sm:block will-change-transform"
					style={{ backfaceVisibility: 'hidden' }}
				/>
			</div>
			
			{/* Grid overlay */}
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