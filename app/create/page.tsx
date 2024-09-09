import ChallengeDetailsForm from '@/components/ChallengerDetails/page'
import CreateChallengePage from '@/components/CreateChallenge/page'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
	title: 'Create Challenge',
	description: 'Create a new challenge',
}

const page = () => {
	return <CreateChallengePage/>
}

export default page