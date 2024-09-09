import LandingPage from '@/components/LandingPage/page'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'My Hackathon App',
	description: 'My Hackathon App',
}

const page = () => {
	return (
		<LandingPage />
	)
}

export default page